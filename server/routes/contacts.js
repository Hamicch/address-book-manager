const router = require('express').Router();
const Contact = require('../models/contacts');

// POST
router.post('/contacts', async (req, res) => {
	try {
		let contact = new Contact();
		contact.name = req.body.full_name;
		contact.email = req.body.email;
		contact.phone = req.body.phone;
		contact.address = req.body.address;
		
		await contact.save();

		res.json({
			status: true,
			message: 'Contact saved successfully',
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
});

//GET
router.get('/contacts', async (req, res) => {
	try {
		let contacts = await Contact.find();

		res.json({
			status: true,
			contacts: contacts,
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
});

//GET Single
router.get('/contacts/:id', async (req, res) => {
	try {
		let contact = await Contact.findOne({ _id: req.params.id });

		res.json({
			status: true,
			contact: contact,
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
});

// PUT
router.put('/contacts/:id', async (req, res) => {
	try {
		let contact = await Contact.findOneAndUpdate({ _id: req.params.id });
		contact.name = req.body.full_name;
		contact.email = req.body.email;
		contact.phone = req.body.phone;
		contact.address = req.body.address;

		await contact.save();

		res.json({
			status: true,
			message: 'Contact updated successfully',
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
});

// DELETE
router.delete('/contacts/:id', async (req, res) => {
	try {
		let contact = await Contact.findOneAndDelete({ _id: req.params.id });
		await contact.remove();

		res.json({
			status: true,
			message: 'Contact deleted successfully',
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
});

module.exports = router;
