
 //takes two id's and returns the id of the other user, an implicit return 
const generateId = (id1, id2) => (id1 > id2 ? id1 + id2 : id2 + id1)

export default generateId