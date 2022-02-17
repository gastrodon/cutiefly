import { DataTypes, Model, Op, Sequelize } from "sequelize";

export const URL_MAX_LENGTH = 512;

const Handle = new Sequelize("sqlite::memory:");

class Entry extends Model {}
Entry.init({
  id: { type: DataTypes.BIGINT, primaryKey: true },
  accessed: DataTypes.BIGINT,
  created: DataTypes.BIGINT,
  url: DataTypes.STRING(URL_MAX_LENGTH), // TODO check in POST handler
}, { sequelize: Handle });

export const sync = async () => await Handle.sync();

export const write_entry = (id, url) =>
  Entry.build({ id, url, accessed: 0, created: 0 }).save();

export const read_entry = async (id) =>
  (await Entry.findOne({ where: { id } })).dataValues;
