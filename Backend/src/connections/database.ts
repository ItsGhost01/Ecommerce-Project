import { Sequelize} from 'sequelize';

export const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/postgres', {
    logging : true
  }) 

async function connectDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({alter:true})
    // await sequelize.sync({alter:true,force:true})
    console.log("Connection successful");
  } catch (error) {
    console.error("Connection failed:", error);
  }
}

export default connectDB();