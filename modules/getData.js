import React, { useState, useRef, useEffect} from 'react';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('fabricDB.db')


export const  GetFabric = () => {

  let fabData = [];

   db.transaction((txn) => {
    txn.executeSql('SELECT * FROM `fabrics`', [], (tx, res) => {
      for (let i = 0; i < res.rows.length; ++i) {
        //let fabData = [];
        fabData.push(res.rows.item(i));
      }
//      console.log(fabData);
      return fabData;



    })
  })


};
