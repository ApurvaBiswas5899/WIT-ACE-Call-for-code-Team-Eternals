import Dish1 from "../../components/images/dish1.svg";
import Dish2 from "../../components/images/dish2.svg";
import Dish5 from "../../components/images/dish5.jpg";
import Dish6 from "../../components/images/dish6.svg";

export const restoInfo =
    [
        // Name for veg : 1.x , N-veg : 2.x
        {
            "name": "Nilkamal Pure Veg Restaurant",
            "description": "North Indian | South Indian | Chinese",
            "location": "address",
            "distance": "1.2 km",
            "owner": "true", // false for user
            "rating": [ // restro overall
                "4.5",
                "50"
            ],
            "reviews": [
                {// individual review
                    rate: "3.5",
                    name: "Deb Sinha",
                    headline: "The food quality was very good",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquentper conubia nostra, per inceptos himenaeos."
                },
                {// individual review
                    rate: "2.5",
                    name: "Debjyoti Niak",
                    headline: "The food quality was very good",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros, pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex, in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquentper conubia nostra, per inceptos himenaeos."
                }
            ],
            "gallery": [
                Dish1, Dish2, Dish5, Dish6
                // option for changing order must be given
            ],
            "menu": [
                {
                    id: 1,
                    name: "Item 1",
                    veg: "true",
                    originalPrice: 500,
                    discountedPrice: 250,
                    discount: "50% ",
                    text: "Item contents.............."
                },
                {

                    id: 2,
                    name: "Item 2",
                    veg: "true",
                    originalPrice: 500,
                    discountedPrice: 250,
                    discount: "50% ",
                    text: "Item contents.............."
                },
                {

                    id: 3,
                    name: "Item 3",
                    veg: "true",
                    originalPrice: 500,
                    discountedPrice: 250,
                    discount: "50% ",
                    text: "Item contents.............."
                }
            ],
            "contactInfo":
            {
                "phone": "9999999999",
                "email": "rest@gmail"
            }
        }
    ];