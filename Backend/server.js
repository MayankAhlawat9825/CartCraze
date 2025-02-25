import express from 'express';
import path from 'path';
import Razorpay from 'razorpay';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API Endpoint to create an order
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount, currency } = req.body;

        const options = {
            amount: amount * 100, // Razorpay works with paise
            currency: currency || 'INR',
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating Razorpay order');
    }
});

app.get("/api/get-razorpay-key", (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});


app.get('/',(req,res) =>(
    res.send("Server is ready")
));
// Get absolute path of the Images folder
const __dirname = path.resolve();
app.use('/api/Images', express.static(path.join(__dirname, 'public/Images')));


//Get the list of categories and it data

app.get('/api/category',(req,res) =>{
  const category = [
    {
        "id": 1,
        "name": "Footwear",
        "discount": "20",
        "products": [
            {
                "id": 101,
                "title": "Running Shoes",
                "price": 2999,
                "discount": "10",
                "description": "Lightweight and comfortable running shoes.",
                "image": "Images/Running-Shoes.jpg",
                "rating": {
                    "average": 4.3,
                    "totalReviews": 150
                }
            },
            {
                "id": 102,
                "title": "Casual Sneakers",
                "price": 2499,
                "discount": "15",
                "description": "Stylish and trendy casual sneakers.",
                "image": "Images/Casual-Sneakers.jpg",
                "rating": {
                    "average": 4.0,
                    "totalReviews": 120
                }
            },
            {
                "id": 103,
                "title": "Formal Leather Shoes",
                "price": 3999,
                "discount": "25",
                "description": "Premium leather shoes for formal occasions.",
                "image": "Images/Formal-Leather-Shoes.jpg",
                "rating": {
                    "average": 4.5,
                    "totalReviews": 180
                }
            },
            {
                "id": 104,
                "title": "Flip Flops",
                "price": 799,
                "discount": "5",
                "description": "Comfortable flip flops for daily use.",
                "image": "Images/Flip-Flops.jpg",
                "rating": {
                    "average": 3.8,
                    "totalReviews": 80
                }
            },
            {
                "id": 105,
                "title": "Loafers",
                "price": 3499,
                "discount": "20",
                "description": "Classic loafers for a smart look.",
                "image": "Images/Loafers.jpg",
                "rating": {
                    "average": 4.2,
                    "totalReviews": 110
                }
            },
            {
                "id": 106,
                "title": "Sports Sandals",
                "price": 1999,
                "discount": "10",
                "description": "Durable sports sandals for outdoor activities.",
                "image": "Images/Sports-Sandals.jpg",
                "rating": {
                    "average": 4.1,
                    "totalReviews": 95
                }
            },
            {
                "id": 107,
                "title": "High Ankle Boots",
                "price": 4599,
                "discount": "30",
                "description": "Stylish and rugged high ankle boots.",
                "image": "Images/High-Ankle-Boots.jpg",
                "rating": {
                    "average": 4.6,
                    "totalReviews": 200
                }
            },
            {
                "id": 108,
                "title": "Canvas Shoes",
                "price": 1599,
                "discount": "12",
                "description": "Casual canvas shoes for everyday wear.",
                "image": "Images/Canvas-Shoes.jpg",
                "rating": {
                    "average": 3.9,
                    "totalReviews": 85
                }
            }
        ]
    },
    {
        "id": 2,
        "name": "Casuals",
        "discount": "25",
        "products": [
            {
                "id": 201,
                "title": "Men's T-shirt",
                "price": 799,
                "discount": "10",
                "description": "Comfortable cotton T-shirt.",
                "image": "Images/Men's-T-shirt.jpg",
                 "rating": {
                    "average": 4.2,
                    "totalReviews": 100
                }
            },
            {
                "id": 202,
                "title": "Denim Jeans",
                "price": 2499,
                "discount": "20",
                "description": "Classic fit denim jeans.",
                "image": "Images/Denim-Jeans.jpg",
                 "rating": {
                    "average": 4.4,
                    "totalReviews": 130
                }
            },
            {
                "id": 203,
                "title": "Casual Shirt",
                "price": 1599,
                "discount": "15",
                "description": "Casual shirt with a modern fit.",
                "image": "Images/Casual-Shirt.jpg",
                 "rating": {
                    "average": 4.0,
                    "totalReviews": 90
                }
            },
            {
                "id": 204,
                "title": "Hoodie",
                "price": 1999,
                "discount": "30",
                "description": "Warm and stylish hoodie.",
                "image": "Images/Hoodie.jpg",
                 "rating": {
                    "average": 4.6,
                    "totalReviews": 160
                }
            },
            {
                "id": 205,
                "title": "Cargo Pants",
                "price": 1799,
                "discount": "18",
                "description": "Durable and trendy cargo pants.",
                "image": "Images/Cargo-Pants.jpg",
                "rating": {
                    "average": 4.1,
                    "totalReviews": 105
                }
            },
            {
                "id": 206,
                "title": "Round Neck Sweatshirt",
                "price": 1299,
                "discount": "12",
                "description": "Soft and warm sweatshirt.",
                "image": "Images/Round-Neck-Sweatshirt.jpg",
                 "rating": {
                    "average": 4.3,
                    "totalReviews": 115
                }
            },
            {
                "id": 207,
                "title": "Casual Shorts",
                "price": 999,
                "discount": "10",
                "description": "Comfortable cotton shorts.",
                "image": "Images/Casual-Shorts.jpg",
                "rating": {
                    "average": 3.8,
                    "totalReviews": 80
                }
            },
            {
                "id": 208,
                "title": "Joggers",
                "price": 1799,
                "discount": "22",
                "description": "Stylish and comfortable joggers.",
                "image": "Images/Joggers.jpg",
                "rating": {
                    "average": 4.5,
                    "totalReviews": 140
                }
            }
        ]
    },
    {
      "id": 3,
      "name": "Formals",
      "discount": "30",
      "products": [
         {
              "id": 301,
              "title": "Formal Suit",
              "price": 7999,
              "discount": "15",
              "description": "Elegant formal suit.",
              "image": "Images/Formal-Suit.jpg",
               "rating": {
                  "average": 4.7,
                  "totalReviews": 200
              }
          },
          {
              "id": 302,
              "title": "Cotton Shirt",
              "price": 2499,
              "discount": "20",
              "description": "Premium cotton shirt.",
              "image": "Images/Cotton-Shirt.jpg",
               "rating": {
                  "average": 4.3,
                  "totalReviews": 110
              }
          },
          {
              "id": 303,
              "title": "Trousers",
              "price": 1999,
              "discount": "10",
              "description": "Classic fit trousers.",
              "image": "Images/Trousers.jpg",
               "rating": {
                  "average": 4.1,
                  "totalReviews": 95
              }
          },
          {
              "id": 304,
              "title": "Blazer",
              "price": 5999,
              "discount": "25",
              "description": "Stylish blazer.",
              "image": "Images/Blazer.jpg",
               "rating": {
                  "average": 4.5,
                  "totalReviews": 140
              }
          },
          {
              "id": 305,
              "title": "Tie Set",
              "price": 999,
              "discount": "12",
              "description": "Classic tie set.",
              "image": "Images/Tie-Set.jpg",
              "rating": {
                  "average": 4.0,
                  "totalReviews": 85
              }
          },
          {
              "id": 306,
              "title": "Leather Belt Set",
              "price": 1499,
              "discount": "10",
              "description": "High-quality leather belt set.",
              "image": "Images/Leather-Belt-Set.jpg",
              "rating": {
                  "average": 4.2,
                  "totalReviews": 100
              }
          },
          {
              "id": 307,
              "title": "Cufflinks",
              "price": 1999,
              "discount": "20",
              "description": "Elegant cufflinks.",
              "image": "Images/Cufflinks.jpg",
              "rating": {
                  "average": 4.4,
                  "totalReviews": 125
              }
          },
          {
              "id": 308,
              "title": "Dress Accessiories",
              "price": 4999,
              "discount": "18",
              "description": "Premium leather dress shoes, leather belt, cufflinks, bow.",
              "image": "Images/Dress-Accessiories.jpg",
              "rating": {
                  "average": 4.6,
                  "totalReviews": 155
              }
          }
      ]
    },
    {
      "id": 4,
      "name": "Sports Wear",
      "discount": "15",
      "products": [
           {
              "id": 401,
              "title": "Track Pants",
              "price": 1499,
              "discount": "12",
              "description": "Comfortable track pants.",
              "image": "Images/Track-Pants.jpg",
               "rating": {
                  "average": 4.2,
                  "totalReviews": 105
              }
          },
          {
              "id": 402,
              "title": "Sports Jacket",
              "price": 2499,
              "discount": "20",
              "description": "Lightweight sports jacket.",
              "image": "Images/Sports-Jacket.jpg",
               "rating": {
                  "average": 4.0,
                  "totalReviews": 90
              }
          },
          {
              "id": 403,
              "title": "Compression T-shirt",
              "price": 1999,
              "discount": "18",
              "description": "Breathable compression T-shirt.",
              "image": "Images/Compression-T-shirt.jpg",
               "rating": {
                  "average": 4.4,
                  "totalReviews": 120
              }
          },
          {
              "id": 404,
              "title": "Running Shorts",
              "price": 1299,
              "discount": "15",
              "description": "Flexible running shorts.",
              "image": "Images/Running-Shorts.jpg",
               "rating": {
                  "average": 4.6,
                  "totalReviews": 150
              }
          },
           {
              "id": 405,
              "title": "Gym Gloves",
              "price": 799,
              "discount": "10",
              "description": "Protective gym gloves.",
              "image": "Images/Gym-Gloves.jpg",
               "rating": {
                  "average": 3.9,
                  "totalReviews": 80
              }
          },
          {
              "id": 406,
              "title": "Sports Socks",
              "price": 499,
              "discount": "5",
              "description": "Breathable sports socks.",
              "image": "Images/Sports-Socks.jpg",
              "rating": {
                  "average": 4.1,
                  "totalReviews": 95
              }
          },
          {
              "id": 407,
              "title": "Sports Cap",
              "price": 599,
              "discount": "8",
              "description": "Adjustable sports cap.",
              "image": "Images/Sports-Cap.jpg",
              "rating": {
                  "average": 4.3,
                  "totalReviews": 110
              }
          },
          {
              "id": 408,
              "title": "Yoga Mat",
              "price": 1999,
              "discount": "20",
              "description": "Non-slip yoga mat.",
              "image": "Images/Yoga-Mat.jpg",
              "rating": {
                  "average": 4.5,
                  "totalReviews": 135
              }
          }
      ]
    },
    {
    "id": 5,
    "name": "Fitness",
    "discount": "18",
    "products": [
        {
            "id": 501,
            "title": "Dumbbell Set",
            "price": 2999,
            "discount": "15",
            "description": "Adjustable dumbbell set for strength training.",
            "image": "Images/Dumbbell-Set.jpg",
            "rating": {
                "average": 4.5,
                "totalReviews": 170
            }
        },
        {
            "id": 502,
            "title": "Treadmill",
            "price": 34999,
            "discount": "25",
            "description": "Foldable treadmill with digital display.",
            "image": "Images/Treadmill.jpg",
            "rating": {
                "average": 4.8,
                "totalReviews": 250
            }
        },
        {
            "id": 503,
            "title": "Resistance Bands",
            "price": 999,
            "discount": "10",
            "description": "Set of resistance bands for workouts.",
            "image": "Images/Resistance-Bands.jpg",
            "rating": {
                "average": 4.2,
                "totalReviews": 115
            }
        },
        {
            "id": 504,
            "title": "Kettlebell",
            "price": 2499,
            "discount": "20",
            "description": "Heavy-duty kettlebell for fitness.",
            "image": "Images/Kettlebell.jpg",
            "rating": {
                "average": 4.6,
                "totalReviews": 180
            }
        },
        {
            "id": 505,
            "title": "Skipping Rope",
            "price": 599,
            "discount": "12",
            "description": "High-speed skipping rope for cardio.",
            "image": "Images/Skipping-Rope.jpg",
            "rating": {
                "average": 4.0,
                "totalReviews": 90
            }
        },
        {
            "id": 506,
            "title": "Foam Roller",
            "price": 1499,
            "discount": "18",
            "description": "Muscle recovery foam roller.",
            "image": "Images/Foam-Roller.jpg",
            "rating": {
                "average": 4.3,
                "totalReviews": 130
            }
        },
        {
            "id": 507,
            "title": "Pull-up Bar",
            "price": 2999,
            "discount": "22",
            "description": "Door-mounted pull-up bar for strength.",
            "image": "Images/Pull-up-Bar.jpg",
            "rating": {
                "average": 4.7,
                "totalReviews": 200
            }
        },
        {
            "id": 508,
            "title": "Workout Bench",
            "price": 4999,
            "discount": "30",
            "description": "Adjustable workout bench for exercises.",
            "image": "Images/Workout-Bench.jpg",
            "rating": {
                "average": 4.9,
                "totalReviews": 270
            }
        }
    ]
    },
    {
    "id": 6,
    "name": "Wearables",
    "discount": "22",
    "products": [
        {
            "id": 601,
            "title": "Smartwatch",
            "price": 6999,
            "discount": "15",
            "description": "Fitness smartwatch with heart rate monitor.",
            "image": "Images/Smartwatch.jpg",
            "rating": {
                "average": 4.6,
                "totalReviews": 190
            }
        },
        {
            "id": 602,
            "title": "Fitness Tracker",
            "price": 3999,
            "discount": "20",
            "description": "Step and sleep tracking fitness band.",
            "image": "Images/Fitness-Tracker.jpg",
            "rating": {
                "average": 4.3,
                "totalReviews": 140
            }
        },
        {
            "id": 603,
            "title": "Wireless Earbuds",
            "price": 4999,
            "discount": "18",
            "description": "Noise-canceling wireless earbuds.",
            "image": "Images/Wireless-Earbuds.jpg",
            "rating": {
                "average": 4.7,
                "totalReviews": 210
            }
        },
        {
            "id": 604,
            "title": "Bluetooth Headphones",
            "price": 6999,
            "discount": "25",
            "description": "Over-ear Bluetooth headphones with mic.",
            "image": "Images/Bluetooth-Headphones.jpg",
            "rating": {
                "average": 4.8,
                "totalReviews": 230
            }
        },
        {
            "id": 605,
            "title": "VR Headset",
            "price": 12999,
            "discount": "30",
            "description": "Virtual reality headset for immersive gaming.",
            "image": "Images/VR-Headset.jpg",
            "rating": {
                "average": 4.9,
                "totalReviews": 280
            }
        },
        {
            "id": 606,
            "title": "Smart Glasses",
            "price": 15999,
            "discount": "20",
            "description": "Augmented reality smart glasses.",
            "image": "Images/Smart-Glasses.jpg",
            "rating": {
                "average": 4.5,
                "totalReviews": 175
            }
        },
        {
            "id": 607,
            "title": "GPS Smartwatch",
            "price": 11999,
            "discount": "15",
            "description": "GPS-enabled smartwatch for outdoor activities.",
            "image": "Images/GPS-Smartwatch.jpg",
            "rating": {
                "average": 4.7,
                "totalReviews": 220
            }
        },
        {
            "id": 608,
            "title": "Heart Rate Monitor",
            "price": 3499,
            "discount": "10",
            "description": "Wearable heart rate monitor for fitness.",
            "image": "Images/Heart-Rate-Monitor.jpg",
            "rating": {
                "average": 4.4,
                "totalReviews": 150
            }
        }
    ]
    },
    {
  "id": 7,
  "name": "Appliances",
  "discount": "20",
  "products": [
      {
          "id": 701,
          "title": "Microwave Oven",
          "price": 8999,
          "discount": "15",
          "description": "Digital microwave oven with convection.",
          "image": "Images/Microwave-Oven.jpg",
          "rating": {
              "average": 4.3,
              "totalReviews": 160
          }
      },
      {
          "id": 702,
          "title": "Refrigerator",
          "price": 25999,
          "discount": "25",
          "description": "Double-door refrigerator with inverter technology.",
          "image": "Images/Refrigerator.jpg",
          "rating": {
              "average": 4.6,
              "totalReviews": 220
          }
      },
      {
          "id": 703,
          "title": "Washing Machine",
          "price": 21999,
          "discount": "18",
          "description": "Front-load washing machine with AI wash.",
          "image": "Images/Washing-Machine.jpg",
          "rating": {
              "average": 4.5,
              "totalReviews": 200
          }
      },
      {
          "id": 704,
          "title": "Air Conditioner",
          "price": 34999,
          "discount": "22",
          "description": "Split AC with auto-clean technology.",
          "image": "Images/Air-Conditioner.jpg",
          "rating": {
              "average": 4.7,
              "totalReviews": 240
          }
      },
      {
          "id": 705,
          "title": "Vacuum Cleaner",
          "price": 7999,
          "discount": "20",
          "description": "High-power vacuum cleaner for deep cleaning.",
          "image": "Images/Vacuum-Cleaner.jpg",
          "rating": {
              "average": 4.2,
              "totalReviews": 150
          }
      },
      {
          "id": 706,
          "title": "Induction Cooktop",
          "price": 3999,
          "discount": "10",
          "description": "Portable induction cooktop with smart controls.",
          "image": "Images/Induction-Cooktop.jpg",
          "rating": {
              "average": 4.0,
              "totalReviews": 120
          }
      },
      {
          "id": 707,
          "title": "Water Purifier",
          "price": 15999,
          "discount": "18",
          "description": "RO+UV water purifier for pure drinking water.",
          "image": "Images/Water-Purifier.jpg",
          "rating": {
              "average": 4.4,
              "totalReviews": 180
          }
      },
      {
          "id": 708,
          "title": "Electric Kettle",
          "price": 2499,
          "discount": "12",
          "description": "Automatic electric kettle with safety features.",
          "image": "Images/Electric-Kettle.jpg",
          "rating": {
              "average": 4.1,
              "totalReviews": 130
          }
      }
  ]
    },
    {
  "id": 8,
  "name": "Home & Kitchen",
  "discount": "28",
  "products": [
      {
          "id": 801,
          "title": "Non-Stick Cookware Set",
          "price": 4999,
          "discount": "20",
          "description": "5-piece non-stick cookware set for easy cooking.",
          "image": "Images/Non-Stick-Cookware-Set.jpg",
          "rating": {
              "average": 4.4,
              "totalReviews": 180
          }
      },
      {
          "id": 802,
          "title": "Dinner Set",
          "price": 3999,
          "discount": "15",
          "description": "Elegant 24-piece dinner set.",
          "image": "Images/Dinner-Set.jpg",
          "rating": {
              "average": 4.2,
              "totalReviews": 150
          }
      },
      {
          "id": 803,
          "title": "Pressure Cooker",
          "price": 2499,
          "discount": "10",
          "description": "Stainless steel pressure cooker.",
          "image": "Images/Pressure-Cooker.jpg",
          "rating": {
              "average": 4.0,
              "totalReviews": 120
          }
      },
      {
          "id": 804,
          "title": "Wall Clock",
          "price": 999,
          "discount": "12",
          "description": "Minimalist wall clock for home decor.",
          "image": "Images/Wall-Clock.jpg",
          "rating": {
              "average": 4.1,
              "totalReviews": 130
          }
      },
      {
          "id": 805,
          "title": "LED Table Lamp",
          "price": 1999,
          "discount": "25",
          "description": "Adjustable LED table lamp for study and work.",
          "image": "Images/LED-Table-Lamp.jpg",
          "rating": {
              "average": 4.5,
              "totalReviews": 200
          }
      },
      {
          "id": 806,
          "title": "Storage Containers",
          "price": 1299,
          "discount": "18",
          "description": "Airtight storage containers for kitchen.",
          "image": "Images/Storage-Containers.jpg",
          "rating": {
              "average": 4.3,
              "totalReviews": 160
          }
      },
      {
          "id": 807,
          "title": "Hand Blender",
          "price": 2999,
          "discount": "22",
          "description": "Hand blender with multiple speed settings.",
          "image": "Images/Hand-Blender.jpg",
          "rating": {
              "average": 4.6,
              "totalReviews": 210
          }
      },
      {
          "id": 808,
          "title": "Scented Candles",
          "price": 999,
          "discount": "30",
          "description": "Aromatherapy scented candles for relaxation.",
          "image": "Images/Scented-Candles.jpg",
          "rating": {
              "average": 4.7,
              "totalReviews": 230
          }
      }
  ]
    }
];
      res.send(category);
    }
);
const port = process.env.PORT || 3000;

app.listen(port , () =>{
    console.log(`Server ready at http://localhost:${port}`);
    }
)