import { Server, Model, belongsTo, hasMany } from 'miragejs'

import partnersListData from './mockserver/db/partners.json'
import foodBandData from './mockserver/db/food-band.json'
import gusiLebediData from './mockserver/db/gusi-lebedi.json'
import palkiSkalkiData from './mockserver/db/palki-skalki.json'
import pizzaBurgerData from './mockserver/db/pizza-burger.json'
import pizzaPlusData from './mockserver/db/pizza-plus.json'
import tanukiData from './mockserver/db/tanuki.json'

const fixtureMap = {
  "pizza-plus": pizzaPlusData,
  "food-band": foodBandData,
  "gusi-lebedi": gusiLebediData,
  "palki-skalki": palkiSkalkiData,
  "pizza-burger": pizzaBurgerData,
  "tanuki": tanukiData
}
export function makeServer({ environment = "development" } = {}) {

let server = new Server({
  environment,
    models: {
      partnersList: Model.extend({
        produucts: hasMany()
      }),
      produuct: Model.extend({
        partnersList: belongsTo()
      })
    },

  seeds(server) {
    partnersListData.forEach(partner => {
        const partnersList = server.create('partnersList', {
        name: partner.name,
        time_of_delivery: partner.time_of_delivery,
        stars: partner.stars,
        price: partner.price,
        kitchen: partner.kitchen,
        image: partner.image,
        products: partner.products});
        fixtureMap[partner.products.split('.')[0]].forEach(prod => {
        server.create('produuct', {prod, partnersList});
        });
   });
  },

  routes() {
    this.namespace = "api"
    this.get("/partners/:name", (schema, request) => {
    console.log("eeeeeeertttt", request.queryParams.sortBy, request.queryParams.searchQuery);
    const partners = schema.partnersLists.all().models.filter(partner => partner.products.split('.')[0] === request.params.name).map(partner => {
    let products =  partner.produucts.models.map(product => product.attrs.prod);
   
    if(request.queryParams.searchQuery) {
     products = partner.produucts.models
      .filter(product => 
        product.attrs.prod.name.toLowerCase().includes(request.queryParams.searchQuery.toLowerCase().replace(/\*/g, '')) || 
        product.attrs.prod.description.toLowerCase().includes(request.queryParams.searchQuery.toLowerCase().replace(/\*/g, '')))
      .map(product => product.attrs.prod);
    } else { }
   
    if (request.queryParams.sortBy == "price") {
    products.sort((a, b) => b.price - a.price);
    } else if (request.queryParams.sortBy == "-price") {
      products.sort((b, a) => b.price - a.price);
    } else {}
    return {
      id: partner.id,
      name: partner.name,
      time_of_delivery: partner.time_of_delivery,
      stars: partner.stars,
      price: partner.price,
      kitchen: partner.kitchen,
      image: partner.image,
      products: products
    };
  });

  return { partners };

    })
    this.get("/partnersList",(schema, request) => {
  
      let title = request.queryParams.title;
    
      if(title) {
        const matchingLists = schema.partnersLists.all().filter(partnerList => {
          console.log("uyhuhjnknknknknkj", partnerList.name);
          return partnerList.name.toLowerCase().includes(title.toLowerCase().replace(/\*/g, '')) || 
          partnerList.kitchen.toLowerCase().includes(title.toLowerCase().replace(/\*/g, ''));
        });
      
        return matchingLists;
      } else {
        return schema.partnersLists.all();
      }
    

    });
  },
  })

  return server
}
