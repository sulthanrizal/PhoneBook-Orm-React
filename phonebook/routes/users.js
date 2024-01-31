var express = require('express');
const { User } = require('../models');
var router = express.Router();
const fs = require('fs')
const path = require('path')
const { Op } = require("sequelize")


/* GET users listing. */
router.get('/phonebook', async function (req, res, next) {
  try {
    const { page = 1, limit = 30, keyword = "", sort = 'ASC' } = req.query

    const { count, rows } = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${keyword}%` } },
          { phone: { [Op.iLike]: `%${keyword}%` } }
        ]

      }, order: [['name', sort]], limit,
      offset: (page - 1) * limit
    })
    const pages = Math.ceil(count / limit)
    res.status(200).json({
      phonebook: rows,
      page: Number(page),
      limit: Number(limit),
      pages: Number(pages),
      total: count
    })
  } catch (error) {
    res.status(500).json(error.message)
  }
});

router.post('/phonebook', async function (req, res) {
  try {
    const { name, phone } = req.body
    if (!name && !phone) throw Error.message = "name and phone can't be empty"
    const phonebook = await User.create({ name, phone })
    res.status(201).json(phonebook)
  } catch (Error) {
    res.status(500).json({ Error })
  }
})

router.put('/phonebook/:id', async function (req, res) {
  try {
    const id = req.params.id
    const { name, phone } = req.body
    if (!name && !phone) throw Error.message = "name and phone can't be empty"
    const updatepb = await User.update({ name, phone }, {
      where: {
        id
      },
      returning: true,
      plain: true
    })
    res.status(201).json(updatepb[1])
  } catch (Error) {
    res.status(500).json({ Error })
  }
})


router.get('/phonebook/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await User.findOne({

      where: {
        id
      }
    })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.put('/phonebook/:id/avatar', async function (req, res) {
  const id = req.params.id
  let avatar
  let uploadPath

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }

  avatar = req.files.avatar
  let fileName = Date.now() + '_' + avatar.name
  uploadPath = path.join(__dirname, '..', 'public', 'images', fileName);

  avatar.mv(uploadPath, async function (err) {

    if (err)
      return res.status(500).send(err);
    try {
      const profile = await User.findOne({
        where: { id }
      });
      if (profile.avatar) {
        const oldFile = path.join(__dirname, '..', 'public', 'images', profile.avatar)
        try {
          fs.unlinkSync(oldFile)
        } catch {
          const phonebook = await User.update({ avatar: fileName }, {
            where: {
              id
            },
            returning: true,
            plain: true
          })
          return res.status(201).json(phonebook[1])
        }
      }
      const phonebook = await User.update({ avatar: fileName }, {
        where: {
          id
        },
        returning: true,
        plain: true
      })
      return res.status(201).json(phonebook[1])
    } catch (err) {
      res.status(500).json(err)
    }
  })

})
router.delete('/phonebook/:id', async function (req, res) {
  try {
    const id = req.params.id
    const user = await User.findOne({
      where: {
        id
      }
    });
    if (!user) {
      return res.status(500).json({ message: "user not found" })
    }
    await User.destroy({
      where: {
        id
      },
      returning: true,
      plain: true
    })
    return res.status(201).json(user)
  } catch (error) {
    res.status(500).json(error.message)
  }
})


module.exports = router;
