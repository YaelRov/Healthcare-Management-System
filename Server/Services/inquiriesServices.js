const inquirySchema = require('./schemas/inquirySchema');
const Inquiry = mongoose.model('Inquiry', inquirySchema);

async function addInquiry(patientId, question, documents = []) {
  try {
    const inquiry = new Inquiry({ patientId, question, documents });
    await inquiry.save();
    return inquiry;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function deleteInquiry(inquiryId) {
  try {
    const deletedInquiry = await Inquiry.findByIdAndDelete(inquiryId);
    if (!deletedInquiry) {
      throw new Error(`Inquiry with ID ${inquiryId} not found.`);
    }
    return deletedInquiry;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function updateInquiry(inquiryId, updateFields) {
  try {
    const updatedInquiry = await Inquiry.findByIdAndUpdate(
      inquiryId, 
      updateFields, 
      { new: true }
    );
    if (!updatedInquiry) {
      throw new Error(`Inquiry with ID ${inquiryId} not found.`);
    }
    return updatedInquiry;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function readInquiry(inquiryId) {
  try {
    const inquiry = await Inquiry.findById(inquiryId);
    if (!inquiry) {
      throw new Error(`Inquiry with ID ${inquiryId} not found.`);
    }
    return inquiry;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// Additional functions for handling documents
async function addDocumentToInquiry(inquiryId, document) {
  // Logic to upload document and get its URL
  const documentUrl = await uploadDocument(document); // Implement this function

  return await updateInquiry(inquiryId, {
    $push: { documents: { filename: document.originalname, url: documentUrl } }
  });
}

async function removeDocumentFromInquiry(inquiryId, documentId) {
  // Logic to delete document from storage
  await deleteDocument(documentId); // Implement this function

  return await updateInquiry(inquiryId, {
    $pull: { documents: { _id: documentId } }
  });
}

module.exports = {
  addInquiry,
  deleteInquiry,
  updateInquiry,
  readInquiry,
  addDocumentToInquiry,
  removeDocumentFromInquiry,
};
