import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: [String],
  tags: {
    type: [String],
  },
  updatedAt: {
    type: Date,
  },
  organizerType: {
    type: String,
  },
  postLink: {
    type: String,
  },
  likedUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true,
      },
      isEdited: {
        type: Boolean,
        default: false,
        required: true,
      },
      text: {
        type: String,
        required: true,
        default: "text",
      },
      image: [
        {
          url: {
            type: String,
          },
          public_id: {
            type: String,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          text: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          updatedAt: {
            type: Date,
          },
          isEdited: {
            type: Boolean,
            default: false,
          },
        },
      ],
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  eventCategory: {
    type: String,
    required: true,
  },
  eventStartAt: {
    type: String,
    required: true,
    default: Date.now.toString(),
  },
  eventEndAt: {
    type: String,
    required: true,
    default: (Date.now + 1).toString(),
  },
  eventId: {
    type: String,
    required: true,
  },
  registrationRequired: {
    type: Boolean,
    required: true,
    default: false,
  },
  registration: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  eventLocation: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      // required: true,
    },
    address: {
      address1: String,
      city: String,
      state: String,
      country: String,
      zipcode: String,
    },
  },
  eventDescription: {
    type: String,
    required: true,
    default: "No description",
  },
  likes: {
    type: Number,
    default: 0,
  },
  // noOfComments: {
  //   type: Number,
  //   default: 0,
  // },
});

postSchema.index({ eventLocation: "2dsphere" });
const PostModel = mongoose.model("post", postSchema);
export default PostModel;
