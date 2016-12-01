import { Schema, arrayOf } from 'normalizr';

export const commentSchema = new Schema('comments');
export const commentsSchema = arrayOf(commentSchema);
