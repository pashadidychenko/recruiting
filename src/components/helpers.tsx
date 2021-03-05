import "../assets/scss/App.scss"

// Массив для временного хранения индексов дубликатов
let sameIndex = [];

// Функция поиска дубликатов
function findDublicate(dataTable, name, data, inx) {
   let index = dataTable.findIndex((el, ind) => el.[name] === data && ind !==inx);
   if(index === -1) {return};
   sameIndex.push(index+1);
}

// Функция валидации телефонного номера
function validatePhone(dataTable, phone, name, index) {
    let phoneNumber = Number(phone);
    findDublicate(dataTable, name, phone, index);
    if(String(phoneNumber).length !== 11 || String(phoneNumber).length < 11 || String(phoneNumber)[0] != 1){
        return <td className="errorData">+{phoneNumber}</td>
    }
    if(String(phoneNumber).length === 11 && String(phoneNumber)[0] === 1){
        phoneNumber = phoneNumber.slice(1);
    }
  return <td>+{phoneNumber}</td>
}

// Функция фалидации электронного адреса
function validateEmail(dataTable, email, name, index) {
    findDublicate(dataTable, name, email, index);
    let valid = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    if(!valid.test(email)) {
        return <td className="errorData">{email}</td>
    }
    return <td>{email}</td>
}

// Функция валидации возраста
function validateAge(age) {
    if(age < 21 || age > 100 || !Number.isInteger(Number(age))){
        return <td className="errorData">{age.trim()}</td>
    }
  return <td>{age.trim()}</td>
}

// Функция валидации опыта
function validateExperience(age, exp) {
    if(0 > Number(exp) || Number(age) < Number(exp) ){
        return <td className="errorData">{exp.trim()}</td>
    }
  return <td>{exp.trim()}</td>
}

// Функция валидации Yearly Income
function validateYearlyIncome(yearlyIncomy) {
    if(0 > Number(yearlyIncomy) || Number(yearlyIncomy) > 1.0e+6){
        return <td className="errorData">{yearlyIncomy.trim()}</td>
    }
  return <td>{Number(yearlyIncomy).toFixed(2)}</td>
}

// Функция валидации Даты
function validateExpirationDate(tableDate) {
   let date1 = new Date();
   let date2 = new Date(tableDate);   
    return <td>{tableDate}</td>
}

// Функция валидации лицензии
function validateLicenseNumber(licenseNumber) {
    if(licenseNumber.length !== 6){
        return <td className="errorData">{licenseNumber.trim()}</td>
    }
  return <td>{licenseNumber.trim()}</td>
}

// Функция создания строки
function greatRow(dataTable, data, index){
    sameIndex = [];
    return (<tr key={index + 1}>
      <td>{index + 1}</td>
      <td>{data.['Full Name'].trim()}</td>
      {validatePhone(dataTable, data.Phone, "Phone", index)}
      {validateEmail(dataTable, data.Email, "Email", index)}
      {validateAge(data.Age)}
      {validateExperience(data.Age, data.Experience)}
      {validateYearlyIncome(data.['Yearly Income'])}
      <td>{data.['Has children'].length !== 0 ? data.['Has children'].trim() : "FALSE"}</td>
      <td>{data.['License states'].split(",").join(" |")}</td>
      {validateExpirationDate(data.['Expiration date'])}
      {validateLicenseNumber(data.['License number'])}
      <td>{sameIndex.join(' / ')}</td>
      </tr>);
  }

// Функция проверки Хедера
function checkHeader(data) {
    let arr = data
      .map((el) => Object.keys(el))[0]
      .slice(0, 3)
      .map((wd) => wd.toLowerCase().trim());
    if (
      arr.includes("full name") &&
      arr.includes("phone") &&
      arr.includes("email")
    ) {
      return true;
    } else {
      return false;
    }
  }

  export {greatRow, checkHeader}