import { DataTypes, UUIDV4 } from 'sequelize';
import {sequelize } from '../database/db.js';


export const Airline = sequelize.define('Airlines', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue:UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      infoContact:{
        type: DataTypes.INTEGER
    }
    },
    {
      timestamps: false
    }
);
 




