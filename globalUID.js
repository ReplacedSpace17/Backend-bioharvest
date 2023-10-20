// globalVar.js

let globalUid = null;

module.exports = {
  getGlobalUid: () => globalUid,
  setGlobalUid: (uid) => {
    globalUid = uid;
  },
};
