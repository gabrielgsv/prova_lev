import insertDb from './insertDb';
import createExcel from './createExcel';
import automation from './automation';

insertDb().then(() => {
  createExcel().then(async () => {
    automation();
  });
});
