import User from '../models/User.js';
import FriendRequest from '../models/FriendRequest.js';

// @desc    Search users by name
// @route   GET /api/social/search?q=name
const searchUsers = async (req, res) => {
    const keyword = req.query.q ? {
        name: {
            $regex: req.query.q,
            $options: 'i'
        }
    } : {};

    // Exclude current user from results
    const users = await User.find({ ...keyword, _id: { $ne: req.user._id } })
        .select('name email settings.goal avatar') // return essential info
        .limit(10);

    res.json(users);
};

// @desc    Follow a user (Direct follow for now, can implement Request logic if private)
// @route   POST /api/social/follow/:id
const followUser = async (req, res) => {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    if (targetUserId === currentUserId.toString()) {
        res.status(400);
        throw new Error('You cannot follow yourself');
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) {
        res.status(404);
        throw new Error('User not found');
    }

    // Check if already following
    if (currentUser.following.includes(targetUserId)) {
        res.status(400);
        throw new Error('Already following this user');
    }

    // Transaction-like update (MongoDB supports transactions but simple saves are ok for MVP)
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();

    res.json({ message: `You are now following ${targetUser.name}` });
};

// @desc    Unfollow a user
// @route   POST /api/social/unfollow/:id
const unfollowUser = async (req, res) => {
    const targetUserId = req.params.id;
    const currentUserId = req.user._id;

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) {
        res.status(404);
        throw new Error('User not found');
    }

    currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
    targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId.toString());

    await currentUser.save();
    await targetUser.save();

    res.json({ message: `Unfollowed ${targetUser.name}` });
};

// @desc    Get user's network info (counts and recent)
// @route   GET /api/social/network
const getNetwork = async (req, res) => {
    const user = await User.findById(req.user._id)
        .populate('following', 'name email')
        .populate('followers', 'name email');

    res.json({
        followingCount: user.following.length,
        followersCount: user.followers.length,
        following: user.following,
        followers: user.followers
    });
};

export { searchUsers, followUser, unfollowUser, getNetwork };
