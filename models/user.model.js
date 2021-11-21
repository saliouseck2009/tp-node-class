const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    slug: { type: String, index: true },
    name: {
      first: String,
      last: String,
      midle: String
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    active: {
      type: String,
      required: true
    },
    coord: [{
      latitude: Number,
      longitude: Number,
      altitude: Number
    }],
    email:{
      type: String,
      index: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);
function slugify(string) {
  const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
userSchema.pre('save', async function (next) {
  this.slug = slugify(this.name);
  next();
});
const User = mongoose.model("user", userSchema);

module.exports = User;