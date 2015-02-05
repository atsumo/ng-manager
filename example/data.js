var faker = require('faker');

var generate = function(generator, size) {

  var list = [];
  for (var i = 0; i < size; i++) {
    list.push(generator(i));
  }
  return list;

};

var user = function(i) {
  return {
    userId: 'user_' + i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
    vod: {
      dimentions: {
        width: 100,
        height: 100
      },
      duration: 3600000000
    },
    createdAt: faker.date.past()
  };
};

var company = function(i) {
  return {
    companyId: 'company_' + i,
    name: faker.company.companyName(),
    phrase: faker.company.catchPhrase(),
    country: faker.address.country(),
    zipCode: faker.address.zipCode(),
    city: faker.address.city(),
    streetAddress: faker.address.streetAddress()
  };
};

module.exports = {
  user: generate(user, 300),
  company: generate(company, 300)
};
