const axios = require('axios');
const cheerio = require('cheerio');

const getWebPage = (options) => {
  return axios.get('https://free-proxy-list.net', {
    ...options,
    responseType: 'document',
  }).then((res) => cheerio.load(res.data));
};

const convertAnonimityToLevel = (anonymity) => {
  if (anonymity.includes('elite')) return 0;
  if (anonymity.includes('anonymous')) return 1;
  return 2;
};

const convertToBoolean = (input) => {
  return input === 'yes';
};

const extractProxyFromTableRow = ($element) => {
  const host = $element.find('td').eq(0).text();
  const port = $element.find('td').eq(1).text();
  const country = $element.find('td').eq(2).text();
  const anonymity = $element.find('td').eq(4).text();
  const level = convertAnonimityToLevel(anonymity);
  const https = convertToBoolean($element.find('td').eq(6).text());
  return {
    host,
    port,
    country,
    level,
    https,
  };
};

const extractProxyListFromWebPage = ($) => {
  return $('#proxylisttable tbody tr')
    .map((index, element) => extractProxyFromTableRow($(element)))
    .toArray();
};

const fetch = (options = {}) =>
  getWebPage(options).then(extractProxyListFromWebPage);

module.exports = {
  fetch,
};

if (!module.parent) {
  fetch().then((res) => console.log(JSON.stringify(res)));
}
