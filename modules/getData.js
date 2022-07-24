import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fabricDB.db')


export const getFabric = () => {

  let fabData = []

  db.transaction((txn) => {
    txn.executeSql('SELECT * FROM `fabrics`', [], (tx, res) => {
      for (let i = 0; i < res.rows.length; ++i) {
        //let fabData = [];
        fabData.push(res.rows.item(i));

        // setNameArray([...nameArray, fabData])
        // setName(Prevname => [...Prevname, res.rows.item(i)])
         // setName([...name, data])
        // array([...array, res.rows.item(i)])
        // console.log('Fabric: ', res.rows.item(i))
      }
      // setName(data);
      // setNameArray(fabData);
      return fabData;
    })
  })
};
