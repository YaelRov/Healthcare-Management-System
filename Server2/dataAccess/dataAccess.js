
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })
const mongoose = require('mongoose');

class DataAccess {
    constructor() {
        this.initialize();
    }

    async initialize() {
        try {
            console.log(process.env.MONGODB_URL);
            await mongoose.connect(process.env.MONGODB_URL
            );
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    async create(data, model) {
        try {
            const newItem = new model(data);
            await newItem.save();
            return newItem;
        } catch (error) {
            console.error('Error creating item:', error);
            throw error;
        }
    }

    async getAll(model) {
        try {
            return await model.find({});
        } catch (error) {
            console.error('Error getting all items:', error);
            throw error;
        }
    }

    async getById(id, model) {
        try {
            return await model.findById(id);
        } catch (error) {
            console.error('Error getting item by id:', error);
            throw error;
        }
    }

    async update(id, data, model) {
        try {
            const updatedItem = await model.findByIdAndUpdate(id, data, { new: true });
            if (!updatedItem) {
                throw new Error('Item not found');
            }
            return updatedItem;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    }

    async delete(id, model) {
        try {
            const deletedItem = await model.findByIdAndDelete(id);
            if (!deletedItem) {
                throw new Error('Item not found');
            }
            return deletedItem;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }
}

module.exports = DataAccess;




// class DataAccess {
//     constructor() {
//     }

//     async create(data) {
//         this.create(data);
//     }

//     async getAll() {
//         this.getAll();
//     }

//     async getById(id) {
//         this.getById(id);
//     }

//     async update(data) {
//         this.update(data);
//     }

//     async delete(data) {
//         this.delete(data);
//     }
// }

// module.exports = DataAccess;
