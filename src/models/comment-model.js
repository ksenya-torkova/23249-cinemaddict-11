import moment from 'moment';

export default class Comment {
  constructor(data) {
    this.emojiType = data[`emotion`];
    this.id = data[`id`];
    this.text = data[`comment`];
    this.time = moment(new Date(data[`date`])).format(`YYYY/MM/DD HH:mm`);
    this.userName = data[`author`];
  }

  toRAW() {
    return {
      "comment": this.text,
      "date": this.time,
      "emotion": this.emojiType,
    };
  }

  static parseComment(data) {
    return new Comment(data);
  }

  static parseComments(data) {
    return data.map(Comment.parseComment);
  }
}
