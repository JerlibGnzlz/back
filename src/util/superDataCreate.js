const {
  Category,
  Brand,
  Product,
  Country,
  PaymentType,
  User,
  CarItem,
  UserAddress,
  UserPayment,
  Order,
  OrderItem,
  Favorites,
  Coments,
} = require("../db");

//categorias
const categories = [
  { name: "calzado" }, //1
  { name: "bolsos" }, //2
  { name: "chaquetas" }, //3
  { name: "camisetas" }, //4
  { name: "camisas" }, //5
  { name: "pabtalones" }, //6
  { name: "blusas" }, //7
  { name: "sacos" }, //8
  { name: "faldas" }, //9
  { name: "ropa deportiva" }, //10
  { name: "accesorios" }, //11
];

//marcas
const brands = [
  { name: "diesel" }, // 1
  { name: "boss" }, // 2
  { name: "nike" }, // 3
  { name: "adidas" }, // 4
  { name: "calvin klein" }, // 5
  { name: "basement" }, // 6
  { name: "mario hernandez" }, // 7
  { name: "libur" }, // 8
  { name: "fendi" }, // 9
  { name: "lacoste" }, // 10
  { name: "guess" }, // 11
];

//calzado
const shoes = [
  {
    name: "classic meet for men",
    description: "zapatos perfectos para eventos formales",
    model: "16-01",
    price: "7900",
    image: ["https://m.media-amazon.com/images/I/51inY39-t8L._AC_UY535_.jpg"],
    genre: "men",
    categoryId: 1,
    brandId: 5,
  },

  {
    name: "formal shoe for men",
    description: "perfectos para cualquier evento",
    model: "16-02",
    price: "11700",
    image: ["https://m.media-amazon.com/images/I/71ZKsSWet3L._AC_UY535_.jpg"],
    genre: "men",
    categoryId: 1,
    brandId: 8,
    enabled: true,
  },

  {
    name: "modern boots",
    description: "botas perfectas con un diseño unico",
    model: "16-03",
    price: "10500",
    image: ["https://m.media-amazon.com/images/I/71ZpqVu-naL._AC_UY695_.jpg"],
    genre: "women",
    categoryId: 1,
    brandId: 6,
  },

  {
    name: "keen",
    description: "sandalias comodas y livianas",
    model: "16-31",
    price: "8600",
    image: [
      "https://m.media-amazon.com/images/I/61sCNegBP3L._AC_UY695_.jpg",
      "https://m.media-amazon.com/images/I/71smUzEifRL._AC_SX625._SX._UX._SY._UY_.jpg",
    ],
    genre: "kids",
    categoryId: 1,
    brandId: 6,
  },
];

//bolsos
const bags = [
  {
    name: "work bag",
    description: "bolso de trabajo con multiples compartimientos",
    model: "16-04",
    price: "6400",
    image: [
      "https://m.media-amazon.com/images/cI/81RELFdUhoL._AC_UY535_.jpg",
      "https://m.media-amazon.com/images/I/8169az1D46L._AC_UY535_.jpg",
    ],
    genre: "men",
    accesory: true,
    categoryId: 2,
    brandId: 7,
  },

  {
    name: "black bag",
    description: "bolso multifuncional para cualquier ocasion",
    model: "16-05",
    price: "10550",
    image: [
      "https://m.media-amazon.com/images/I/81nFSgx+9cL._AC_UX569_.jpg",
      "https://m.media-amazon.com/images/I/51DFYACbVCL._AC_SX569._SX._UX._SY._UY_.jpg",
    ],
    genre: "women",
    categoryId: 2,
    brandId: 7,
  },

  {
    name: "red bag",
    description: "bolso practico y comodo para cargar",
    model: "16-06",
    price: "9850",
    image: [
      "https://m.media-amazon.com/images/I/71GHgfcRGRL._AC_UY625_.jpg",
      "https://m.media-amazon.com/images/I/61ge3K13IaS._AC_SY675._SX._UX._SY._UY_.jpg",
    ],
    genre: "women",
    categoryId: 2,
    brandId: 9,
  },

  {
    name: "skip hop",
    description: "morral para colegio con multiples bolsillos",
    model: "16-32",
    price: "8300",
    image: [
      "https://m.media-amazon.com/images/I/91sH6MYYkxL._SX450_.jpg",
      "https://m.media-amazon.com/images/I/81qOTTeBEWL._SX466_.jpg",
      "https://m.media-amazon.com/images/I/71dN9KjyYQL._SY450_.jpg",
    ],
    genre: "kids",
    categoryId: 2,
    brandId: 9,
  },
];

//chaquetas
const jackets = [
  {
    name: "zip up jacket",
    description: "perfecta para cualquier prenda",
    model: "16-07",
    price: "5400",
    image: [
      "https://m.media-amazon.com/images/I/71oOXgSRyOS._AC_UX466_.jpg",
      "https://m.media-amazon.com/images/I/816F2JaFHuS._AC_SY550._SX._UX._SY._UY_.jpg",
    ],
    genre: "men",
    categoryId: 3,
    brandId: 2,
  },

  {
    name: "transformer jacket",
    description: "chaqueta de transformers diseño exclusivo",
    model: "16-33",
    price: "4800",
    image: [
      "https://m.media-amazon.com/images/I/71FkNESJmbL._AC_UX569_.jpg",
      "https://m.media-amazon.com/images/I/8112HgHJs1L._AC_SX569._SX._UX._SY._UY_.jpg",
    ],
    genre: "kids",
    categoryId: 3,
    brandId: 2,
  },

  {
    name: "sport jacket",
    description: "chaqueta termica con diseño comodo para inviernos",
    model: "16-08",
    price: "16900",
    image: ["https://m.media-amazon.com/images/I/51okOH2sQcL._AC_UX522_.jpg"],
    genre: "men",
    categoryId: 3,
    brandId: 3,
  },

  {
    name: "sport jacket2",
    description: "chaqueta termica con diseño comodo para inviernos",
    model: "16-09",
    price: "16900",
    image: ["https://m.media-amazon.com/images/I/61gFpfJNSBL._AC_UX522_.jpg"],
    genre: "women",
    categoryId: 3,
    brandId: 3,
  },
];

//camisetas
const tshirt = [
  {
    name: "exclusive line t-shirt",
    description: "camiseta con un diseño unico se adapta al cuerpo",
    model: "16-10",
    price: "3800",
    image: ["https://m.media-amazon.com/images/I/61eibu+hUkL._AC_UX569_.jpg"],
    genre: "men",
    categoryId: 4,
    brandId: 1,
  },

  {
    name: "comfortable t-shirt",
    description: "camiseta con lineas delicadas",
    model: "16-11",
    price: "5700",
    image: ["https://m.media-amazon.com/images/I/618j4k33ROS._AC_UY550_.jpg"],
    genre: "women",
    categoryId: 4,
    brandId: 2,
  },

  {
    name: "modern t-shirt",
    description: "camiseta juvenil perfecta para una ocasion informal",
    model: "16-12",
    price: "6300",
    image: ["https://m.media-amazon.com/images/I/71pYFYbDiQL._AC_UY550_.jpg"],
    genre: "women",
    categoryId: 4,
    brandId: 2,
  },
  {
    name: "gildan",
    description: "100% algodon de la mejor calidad",
    model: "16-65",
    price: "6600",
    image: ["https://m.media-amazon.com/images/I/31ff2ROq7xL._AC_.jpg"],
    genre: "no-gender",
    categoryId: 4,
    brandId: 3,
  },
];

//camisas
const shirt = [
  {
    name: "cotton shirt",
    description: "camisa a cuadros con colores vivos",
    model: "16-13",
    price: "5700",
    image: ["https://m.media-amazon.com/images/I/71L1baFFLTL._AC_UY550_.jpg"],
    genre: "men",
    categoryId: 5,
    brandId: 3,
  },

  {
    name: "elegant shirt",
    description: "camisa de manga larga elegante y ajustable",
    model: "16-14",
    price: "7900",
    image: ["https://m.media-amazon.com/images/I/61lO2wFWxvS._AC_UX569_.jpg"],
    genre: "men",
    categoryId: 5,
    brandId: 5,
  },

  {
    name: "cowboy shirt",
    description: "camisa estilo vaquera con cortes delicados",
    model: "16-15",
    price: "8500",
    image: ["https://m.media-amazon.com/images/I/81nUKxgPb-L._AC_UY550_.jpg"],
    genre: "women",
    categoryId: 5,
    brandId: 8,
  },
];

//pantalones
const pant = [
  {
    name: "dress pants",
    description: "casual pants and unique detail",
    model: "16-16",
    price: "3200",
    image: ["https://m.media-amazon.com/images/I/71pHQ8klnvL._AC_UY500_.jpg"],
    genre: "men",
    categoryId: 6,
    brandId: 11,
  },

  {
    name: "saozi",
    description: "pantalones de anime para fanaticos reales",
    model: "16-71",
    price: "8600",
    image: ["https://m.media-amazon.com/images/I/51nMm8RTivL._AC_UX466_.jpg"],
    genre: "no-gender",
    categoryId: 6,
    brandId: 11,
  },

  {
    name: "woman pants",
    description: "pantalones de uso cotidiano comodos y duraderos",
    model: "16-17",
    price: "6600",
    image: ["https://m.media-amazon.com/images/I/71aoxjomUnL._AC_UX569_.jpg"],
    genre: "women",
    categoryId: 6,
    brandId: 1,
  },

  {
    name: "youth pants",
    description: "pantalones casuales comodos y delicados",
    model: "16-18",
    price: "4900",
    image: ["https://m.media-amazon.com/images/I/71yHXc49QjL._AC_UY550_.jpg"],
    genre: "women",
    categoryId: 6,
    brandId: 3,
  },
];

//blusas
const blouse = [
  {
    name: "milumia",
    description: "blusa cuello redondo adecuada para cualquier prenda",
    model: "16-19",
    price: "4600",
    image: ["https://m.media-amazon.com/images/I/5157vTKqycL._AC_UY550_.jpg"],
    genre: "women",
    categoryId: 7,
    brandId: 1,
  },

  {
    name: "shewin",
    description: "estilo bohemio con flores y colores llamativos",
    model: "16-20",
    price: "5900",
    image: ["https://m.media-amazon.com/images/I/719Ix30s4jS._AC_UL320_.jpg"],
    genre: "women",
    categoryId: 7,
    brandId: 2,
  },

  {
    name: "allegra",
    description: "estilo juvenil perfecto para cualquier reunion ",
    model: "16-21",
    price: "5800",
    image: ["https://m.media-amazon.com/images/I/71aCF6HJp4L._AC_UY550_.jpg"],
    genre: "women",
    categoryId: 7,
    brandId: 1,
  },
];

//coat
const coat = [
  {
    name: "golden coat",
    description: "traje de lujo de lentejuelas para brillar en cualquier lugar",
    model: "16-22",
    price: "11800",
    image: ["https://m.media-amazon.com/images/I/81M5wlxrYqL._AC_UX569_.jpg"],
    genre: "men",
    categoryId: 8,
    brandId: 9,
  },

  {
    name: "coofandy",
    description: "casual, elegante y como abrigo",
    model: "16-23",
    price: "10600",
    image: ["https://m.media-amazon.com/images/I/81+Pos5XcRL._AC_UY550_.jpg"],
    genre: "men",
    categoryId: 8,
    brandId: 10,
  },

  {
    name: "pretty woman",
    description: "abrigo elegante para citas formales",
    model: "16-24",
    price: "15900",
    image: ["https://m.media-amazon.com/images/I/61FKCaOHDsL._AC_UX569_.jpg"],
    genre: "women",
    categoryId: 8,
    brandId: 10,
  },
];

//skirt
const skirt = [
  {
    name: "alelly",
    description: "falda corta ideal para dias de verano",
    model: "16-25",
    price: "3600",
    image: ["https://m.media-amazon.com/images/I/81qUwb-ojWL._AC_UX425_.jpg"],
    genre: "women",
    categoryId: 9,
    brandId: 11,
  },

  {
    name: "prinstory",
    description: "falda larga perfecta para un dia de playa",
    model: "16-26",
    price: "4900",
    image: ["https://m.media-amazon.com/images/I/71pgDYTADWL._AC_UY550_.jpg"],
    genre: "women",
    categoryId: 9,
    brandId: 1,
  },

  {
    name: "sheln",
    description: "falda de cintura alta casual",
    model: "16-27",
    price: "4300",
    image: [
      "https://m.media-amazon.com/images/I/81PGCu6n8KL._AC_UY550_.jpg",
      "https://m.media-amazon.com/images/I/61B7KbdXTEL._AC_SX569._SX._UX._SY._UY_.jpg",
    ],
    genre: "women",
    categoryId: 9,
    brandId: 10,
  },
];

//accesorios
const accesories = [
  {
    name: "andolit",
    description: "gafas de sol con protector solar",
    model: "16-34",
    price: "3600",
    image: ["https://m.media-amazon.com/images/I/61rPdKiel2L._AC_UX569_.jpg"],
    genre: "no-gender",
    categoryId: 11,
    brandId: 3,
  },

  {
    name: "new soul",
    description: "gargantilla en capas con dije",
    model: "16-35",
    price: "5300",
    image: [
      "https://m.media-amazon.com/images/I/61qxPOO43wL._AC_UX569_.jpg",
      "https://m.media-amazon.com/images/I/7142P7bw7dL._AC_UX569_.jpg",
    ],
    genre: "no-gender",
    categoryId: 10,
    brandId: 7,
  },

  {
    name: "deweisn",
    description: "espejo de viaje util en todo momento",
    model: "16-36",
    price: "2500",
    image: [
      "https://m.media-amazon.com/images/I/31pfgqap5BS._AC_.jpg",
      "https://m.media-amazon.com/images/I/61KB+1pCSML._AC_SX679_.jpg",
    ],
    genre: "no-gender",
    categoryId: 10,
    brandId: 3,
  },
];

//ropa deportiva
const sport = [
  {
    name: "zetiy",
    description: "set deportivo completo",
    model: "16-28",
    price: "12500",
    image: ["https://m.media-amazon.com/images/I/71UrTifhh7L._AC_UX569_.jpg"],
    genre: "women",
    categoryId: 10,
    brandId: 3,
  },

  {
    name: "leaduty",
    description: "connjunto de 2 piezas para deporte",
    model: "16-29",
    price: "11300",
    image: ["https://m.media-amazon.com/images/I/51qYzGbhKhL._AC_UY550_.jpg"],
    genre: "women",
    categoryId: 10,
    brandId: 4,
  },

  {
    name: "jya",
    description: "traje de compresion para ejercicio de alto rendimiento",
    model: "16-30",
    price: "15600",
    image: ["https://m.media-amazon.com/images/I/51-YNLnErVL._AC_UX569_.jpg"],
    genre: "men",
    categoryId: 10,
    brandId: 3,
  },
];

const products = shoes
  .concat(bags)
  .concat(jackets)
  .concat(tshirt)
  .concat(shirt)
  .concat(pant)
  .concat(blouse)
  .concat(coat)
  .concat(skirt)
  .concat(sport)
  .concat(accesories);

//console.log (products)

//tipoDePago
const paymentType = [
  { paymentName: "Tarjeta de Crédito" },
  { paymentName: "Tarjeta de Débito" },
  { paymentName: "Mercado Pago" },
];

const userPayments = [
  // Métodos de pago del usuario 2
  {
    cardNumber: "4546400034748181",
    expirationDay: "2025-11-30",
    provider: "Visa",
    userId: 2,
    paymentTypeId: 1,
  },
  {
    provider: "Mercado Pago",
    userId: 2,
    paymentTypeId: 3,
  },
  // Métodos de pago del usuario 3
  {
    cardNumber: "5100010000000114",
    expirationDay: "2030-11-25",
    provider: "MasterCard",
    userId: 3,
    paymentTypeId: 1,
  },
  {
    provider: "Mercado Pago",
    userId: 3,
    paymentTypeId: 3,
  },
  // Métodos de pago del usuario 4
  {
    provider: "Mercado Pago",
    userId: 4,
    paymentTypeId: 3,
  },
];

//usuario
const user = [
  {
    email: "neubigin0@4shared.com",
    names: "Lacie lar",
    lastNames: "Neubigin nothi",
    phone: "+5496684645",
    birthDate: "1983-11-11",
    genre: "male",
  },

  {
    email: "rdillicate1@list-manage.com",
    names: "Rivalee ree",
    lastNames: "Dillicate cart",
    phone: "+54962383345",
    birthDate: "1982-07-05",
  },

  {
    email: "odunnan2@ow.ly",
    names: "Ofella tee",
    lastNames: "Dunnan cat",
    phone: "+54962383345",
    birthDate: "1990-05-09",
    isAdmin: true,
  },

  {
    email: "mchilles3@hatena.ne.jp",
    names: "Ofe Meredith",
    lastNames: "Chilles riss",
    phone: "+541262381220",
    birthDate: "1992-03-11",
  },

  {
    email: "abudget4@rediff.com",
    names: "Atlanta Mered",
    lastNames: "Chil Budget",
    phone: "+5412625783",
    birthDate: "1991-01-03",
    isAdmin: true,
  },
];

const countries = [
  { countryName: "Anguila" }, // 1
  { countryName: "Antigua y Barbuda" }, // 2
  { countryName: "Argentina" }, // 3
  { countryName: "Aruba" }, // 4
  { countryName: "Bahamas" }, // 5
  { countryName: "Barbados" }, // 6
  { countryName: "Belice" }, // 7
  { countryName: "Bermudas" }, // 8
  { countryName: "Bolivia" }, // 9
  { countryName: "Bonaire" }, // 10
  { countryName: "Brasil" }, // 11
  { countryName: "Canadá" }, // 12
  { countryName: "Chile" }, // 13
  { countryName: "Colombia" }, // 14
  { countryName: "Costa Rica" }, // 15
  { countryName: "Cuba" }, // 16
  { countryName: "Curazao" }, // 17
  { countryName: "Dominicana" }, // 18
  { countryName: "Ecuador" }, // 19
  { countryName: "El Salvador" }, // 20
  { countryName: "Estados Unidos" }, // 21
  { countryName: "Granada" }, // 22
  { countryName: "Groenlandia" }, // 23
  { countryName: "Guadalupe" }, // 24
  { countryName: "Guatemala" }, // 25
  { countryName: "Guayana Francesa" }, // 26
  { countryName: "Guyana" }, // 27
  { countryName: "Haití" }, // 28
  { countryName: "Honduras" }, // 29
  { countryName: "Islas Caimán" }, // 30
  { countryName: "Islas Malvinas" }, // 31
  { countryName: "Islas Turcas y Caicos" }, // 32
  { countryName: "Islas Vírgenes Británicas" }, // 33
  { countryName: "Islas Vírgenes de los Estados Unidos" }, // 34
  { countryName: "Jamaica" }, // 35
  { countryName: "Martinica" }, // 36
  { countryName: "México" }, // 37
  { countryName: "Montserrat" }, // 38
  { countryName: "Nicaragua" }, // 39
  { countryName: "Panamá" }, // 40
  { countryName: "Paraguay" }, // 41
  { countryName: "Perú" }, // 42
  { countryName: "Puerto Rico" }, // 43
  { countryName: "República Domnicana" }, // 44
  { countryName: "San Bartolomé" }, // 45
  { countryName: "San Cristobal y Nieves" }, // 46
  { countryName: "San Martín" }, // 47
  { countryName: "San Pedro y Miquelón" }, // 48
  { countryName: "San Vicente y las Granadinas" }, // 49
  { countryName: "Santa Lucía" }, // 50
  { countryName: "Surinam" }, // 51
  { countryName: "Trinidad y Tobago" }, // 52
  { countryName: "Uruguay" }, // 53
  { countryName: "Venezuela" }, // 54
];

//direccionDeUsuario
const userAddress = [
  {
    postalCode: "b1123",
    state: "Buenos",
    city: "Anguila",
    address: "calle 12 ",
    annotations: "Esquina Cruz ",
    userId: 1,
    countryId: 1,
  },

  {
    postalCode: "c6784",
    state: "Saint jhon",
    city: "Antigua y Barbuda",
    address: "Osbourn",
    annotations: "a 3 km de la playa",
    userId: 4,
    countryId: 3,
  },

  {
    postalCode: "b3223",
    state: "Buenos Aires",
    city: "Argentina",
    address: "Av. Eva Peron  3234",
    annotations: "Casa blanca de rejas negra",
    userId: 2,
    countryId: 3,
  },

  {
    postalCode: "a3480",
    state: "Orangenstal",
    city: "Aruba",
    address: "Smith boulevar #160",
    annotations: "Mr. Brown",
    userId: 5,
    countryId: 4,
  },

  {
    postalCode: "h4399",
    state: "Orangenstal",
    city: "Bahamas",
    address: "Smith boulevar #160",
    annotations: "Mr. Brown",
    userId: 1,
    countryId: 5,
  },
];

const carItem = [
  //productos del usuario 2
  {
    quantity: 1,
    userId: 2,
    productId: 1,
  },

  {
    quantity: 2,
    userId: 2,
    productId: 3,
  },

  {
    quantity: 3,
    userId: 2,
    productId: 12,
  },

  //productos del usuario 4
  {
    quantity: 3,
    userId: 4,
    productId: 20,
  },

  {
    quantity: 1,
    userId: 4,
    productId: 21,
  },

  {
    quantity: 2,
    userId: 4,
    productId: 30,
  },

  //productos del usuario 1
  {
    quantity: 2,
    userId: 1,
    productId: 26,
  },

  {
    quantity: 2,
    userId: 1,
    productId: 12,
  },
];

const favorites = [
  // favoritos del usuario 2
  {
    userId: 2,
    productId: 1,
  },
  {
    userId: 2,
    productId: 2,
  },
  {
    userId: 2,
    productId: 3,
  },
  {
    userId: 2,
    productId: 4,
  },
  {
    userId: 2,
    productId: 5,
  },
  // Deseados del usuario 4
  {
    userId: 4,
    productId: 17,
  },
];

const coments = [
  // Reseñas del usuario 2
  {
    rating: 5,
    review: "Muy bueno, lo recomiendo al 100%",
    userId: 2,
    productId: 19,
  },
  {
    rating: 1,
    review: "no recoemiendo este producto mala calidad",
    userId: 2,
    productId: 11,
  },
  // Reseñas de usuario 4
  {
    rating: 5,
    review: "Es el mejor producto de la vida 😍!",
    userId: 4,
    productId: 26,
  },
];

// const orders = [
//   // Órdenes del usuario 2
//   {
//     status: "CREATED",
//     total: 76.4,
//     userId: 2,
//     userPaymentId: 1,
//     userAddressId: 3,
//   },
//   {
//     status: "CREATED",
//     total: 75.9,
//     userId: 2,
//     userPaymentId: 1,
//     userAddressId: 3,
//   },
// ];

// const orderItems = [
//   // Artículos de la orden 1
//   {
//     quantity: 1,
//     price: 33.75,
//     productId: 4,
//     orderId: 1,
//   },
//   {
//     quantity: 2,
//     price: 42.66,
//     productId: 10,
//     orderId: 1,
//   },
//   // Artículos de la orden 2
//   {
//     quantity: 3,
//     price: 75.9,
//     productId: 5,
//     orderId: 2,
//   },

//   {
//     quantity: 1,
//     price: 33.75,
//     productId: 4,
//     orderId: 2,
//   },

//   {
//     quantity: 9,
//     price: 33.75,
//     productId: 7,
//     orderId: 2,
//   },
// ];

const superData = async () => {
  //carga de categorias
  for (let i = 0; i < categories.length; i++) {
    await Category.create(categories[i]);
  }
  console.log("categories upload db");

  //carga de marcas
  for (let i = 0; i < brands.length; i++) {
    await Brand.create(brands[i]);
  }
  console.log("brands upload db");

  //carga de productos
  for (let i = 0; i < products.length; i++) {
    await Product.create(products[i]);
  }
  console.log("products upload db");

  //carga de paises
  for (let i = 0; i < countries.length; i++) {
    await Country.create(countries[i]);
  }
  console.log("countries uploa db");

  //carga de tipos de pago
  for (let i = 0; i < paymentType.length; i++) {
    await PaymentType.create(paymentType[i]);
  }
  console.log("paymentType upload db");

  //carga de usuarios
  for (let i = 0; i < user.length; i++) {
    await User.create(user[i]);
  }
  console.log("user upload db");

  //carga de articulos en carrito
  for (let i = 0; i < carItem.length; i++) {
    await CarItem.create(carItem[i]);
  }
  console.log("carItem upload db");

  //carga de direcciones
  for (let i = 0; i < userAddress.length; i++) {
    await UserAddress.create(userAddress[i]);
  }
  console.log("userAddress upload db");

  //carga metodo de pago usuario
  for (let i = 0; i < userPayments.length; i++) {
    await UserPayment.create(userPayments[i]);
  }
  console.log("userPayment upload db");

  // //carga de ordenes
  // for (let i = 0; i < orders.length; i++) {
  //   await Order.create(orders[i]);
  // }
  // console.log("orders upload db");

  // //carga de articulos por orden
  // for (let i = 0; i < orderItems.length; i++) {
  //   await OrderItem.create(orderItems[i]);
  // }
  // console.log("orderItems upload db");

  //carga de favoritos
  for (let i = 0; i < favorites.length; i++) {
    await Favorites.create(favorites[i]);
  }
  console.log("favorites upload db");

  //carga de comentarios
  for (let i = 0; i < coments.length; i++) {
    await Coments.create(coments[i]);
  }
  console.log("coments upload db");
};

module.exports = { superData };
