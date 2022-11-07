function findCodeBlockIndexes(objectArray) {
  var indexArr = [];
  objectArray.map((obj, i) => {
    if (obj.content === "```") {
      indexArr.push(i);
    }
  });
  return indexArr;
}
function modifyCodeBlocks(objectArray, codeBlockIndexes) {
  if (codeBlockIndexes.length % 2 !== 0 || codeBlockIndexes.length === 0) {
    return objectArray;
  }
  var inCodeBlock = false;
  return objectArray.map((obj, i) => {
    if (i === codeBlockIndexes[0] && inCodeBlock === false) {
      codeBlockIndexes.shift();
      inCodeBlock = true;
      return {
        type: "delete",
        content: obj.content,
      };
    } else if (i === codeBlockIndexes[0] && inCodeBlock === true) {
      codeBlockIndexes.shift();
      inCodeBlock = false;
      return {
        type: "delete",
        content: obj.content,
      };
    } else if (inCodeBlock === true) {
      return {
        type: "code",
        content: obj.content,
      };
    } else {
      return obj;
    }
  });
}
function deleteObj(objArray) {
  return objArray.filter((obj) => obj.type !== "delete");
}
export default function setCodeType(objectArray) {
  var indexes = findCodeBlockIndexes(objectArray);
  objectArray = modifyCodeBlocks(objectArray, indexes);
  return deleteObj(objectArray);
}