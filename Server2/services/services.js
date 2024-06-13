// class Service {
//     constructor(dataAccess) {
//         this.dataAccess = dataAccess;
//     }

//     async create(data) {
//         try {
//             return await this.dataAccess.create(data);
//         } catch (err) {
//             throw err;
//         }
//     }

//     async getAll() {
//         try {
//             return await this.dataAccess.getAll();
//         } catch (err) {
//             throw err;
//         }
//     }

//     async getByUserId(id) {
//         try {
//             return await this.dataAccess.getUserById(id);
//         } catch (err) {
//             throw err;
//         }
//     }

//     async getByItemId(userId,id) {
//         try {
//             return await this.dataAccess.getByIdItemId(userId,id);
//         } catch (err) {
//             throw err;
//         }
//     }

//     async update(data) {
//         try {
//             return await this.dataAccess.update(data);
//         } catch (err) {
//             throw err;
//         }
//     }

//     async delete(id) {
//         try {
//             return await this.dataAccess.delete(id);
//         } catch (err) {
//             throw err;
//         }
//     }
// }

// module.exports = Service;
