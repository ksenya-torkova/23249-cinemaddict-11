import moment from 'moment';

export default class Comment {
  constructor(data) {
    this.commentText = data[`comment`];
    this.emojiType = data[`emotion`];
    this.id = data[`id`];
    this.time = moment(new Date(data[`date`])).format(`YYYY/MM/DD HH:mm`);
    this.userName = data[`author`];
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }

  toRAW() {
    return {
      "comment": this.commentText,
      "date": this.time,
      "emotion": this.emojiType,
    };
  }
}
