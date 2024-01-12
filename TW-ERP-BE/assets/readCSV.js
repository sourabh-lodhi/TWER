const { stringify } = require('csv-stringify')
const { parse } = require('csv-parse')
const mongoose = require('mongoose')
const fs = require('fs')
const randomString = require('randomstring')

require('dotenv').config({ path: '../.env' })
const message = require('../constant')
const userService = require('../services/userService')
const { UserAccountService } = require('../services/userAccountService')
const userAccountService = new UserAccountService()

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.info(message.successMessages.MONG0_CONN_SUCCESS)
  })
  .catch((err) => {
    throw new Error(err)
  })

const getCSVuser = (file_path) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(file_path).pipe(
      parse({ columns: false, delimiter: ":" }, (err, records) => {
        if (err) {
          reject(err)
        }
        resolve(records)
      }),
    )
  })
}

const updateCSV = async (records) => {
  const filename = './TW-Users-2.csv'
  const writableStream = fs.createWriteStream(filename)
  const columns = [
    'empCode',
    'fullName',
    'email',
    'allocatedLeaves',
    'password',
    'DOB',
    'joiningDate',
    'role',
    'salary',
    'pf_status',
    'pan_no',
    'aadhar_no',
    'uan_no',
    'esi_no',
    'account_no',
  ]
  const stringifier = stringify({ header: true, columns: columns })
  records.map((row) => {
    row = { ...row, password: row.password }
    stringifier.write(row)
  })
  stringifier.pipe(writableStream)
}

const registerCSVuser = async () => {
  let records = await getCSVuser('./TW-Users-2.csv')
  records = records.map((record) => {
    let pass = randomString.generate(6)
    return { ...record, password: pass }
  })
  await updateCSV(records)

  // await Users.insertMany(records);
  for (const record of records) {
    const user = await userService.createUser(record)
    record.user = user._id
    record.salary_password = 'Admin#123'
    await userAccountService.createEditUserAccount(record)
  }
}


registerCSVuser()
