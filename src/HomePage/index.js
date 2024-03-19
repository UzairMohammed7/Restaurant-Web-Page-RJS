// import {Component} from 'react'
// import Loader from 'react-loader-spinner'

// import Header from '../Header'
// import DishItem from '../DishItem'
// import './index.css'

// class HomePage extends Component {
//   state = {
//     isLoading: true,
//     activeCategoryId: '',
//     cartItems: [],
//     categoriesList: [],
//   }

//   componentDidMount() {
//     this.getRestaurantMenu()
//   }

//   getRestaurantMenu = async () => {
//     this.setState({isLoading: true})
//     const apiUrl =
//       'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
//     const response = await fetch(apiUrl)
//     const fetchedData = await response.json()

//     const updatedData = fetchedData[0].table_menu_list.map(eachMenu => ({
//       menuCategory: eachMenu.menu_category,
//       menuCategoryId: eachMenu.menu_category_id,
//       menuCategoryImage: eachMenu.menu_category_image,
//       categoryDishes: eachMenu.category_dishes.map(eachDish => ({
//         dishId: eachDish.dish_id,
//         dishImage: eachDish.dish_image,
//         dishType: eachDish.dish_Type,
//         dishName: eachDish.dish_name,
//         dishPrice: eachDish.dish_price,
//         dishCurrency: eachDish.dish_currency,
//         dishCalories: eachDish.dish_calories,
//         dishDescription: eachDish.dish_description,
//         dishAvailability: eachDish.dish_Availability,
//         addOnCat: eachDish.addonCat,
//       })),
//     }))
//     this.setState({
//       isLoading: false,
//       categoriesList: updatedData,
//       activeCategoryId: updatedData[0].menuCategoryId,
//     })
//   }

//   addItemToCart = dish => {
//     const {cartItems} = this.state
//     const isDishInCart = cartItems.find(
//       eachDish => eachDish.dishId === dish.dishId,
//     )
//     if (!isDishInCart) {
//       const newDish = {...dish, quantity: 1}
//       this.setState(prev => ({cartItems: [...prev.cartItems, newDish]}))
//     } else {
//       this.setState(prevState => ({
//         cartItems: prevState.cartItems.map(item =>
//           item.dishId === dish.dishId
//             ? {...item, quantity: item.quantity + 1}
//             : item,
//         ),
//       }))
//     }
//   }

//   removeItemFromCart = dish => {
//     const {cartItems} = this.state
//     const isDishInCart = cartItems.find(
//       eachDish => eachDish.dishId === dish.dishId,
//     )
//     if (isDishInCart) {
//       this.setState(prevState => ({
//         cartItems: prevState.cartItems
//           .map(item =>
//             item.dishId === dish.dishId
//               ? {...item, quantity: item.quantity - 1}
//               : item,
//           )
//           .filter(item => item.quantity > 0),
//       }))
//     }
//   }

//   onUpdateActiveCategoryId = menuCategoryId => {
//     this.setState({activeCategoryId: menuCategoryId})
//   }

//   renderTabMenuList = () => {
//     const {categoriesList, activeCategoryId} = this.state

//     const onClickHandler = menuCategoryId =>
//       this.onUpdateActiveCategoryIdx(menuCategoryId)

//     return categoriesList.map(eachCategory => (
//       <li
//         key={eachCategory.menuCategoryId}
//         className={`each-tab-item ${
//           eachCategory.menuCategoryId === activeCategoryId
//             ? 'active-tab-item'
//             : ''
//         }`}
//         onClick={onClickHandler}
//       >
//         <button
//           type="button"
//           className="mt-0 mb-0 ms-2 me-2 tab-category-button"
//         >
//           {eachCategory.menuCategory}
//         </button>
//       </li>
//     ))
//   }

//   renderDishes = () => {
//     const {categoriesList, activeCategoryId, cartItems} = this.state
//     const {categoryDishes} = categoriesList.find(
//       eachCategory => eachCategory.menuCategoryId === activeCategoryId,
//     )
//     return (
//       <ul className="dishes-list-container">
//         {categoryDishes.map(eachDish => (
//           <DishItem
//             key={eachDish.dishId}
//             dishDetails={eachDish}
//             cartItems={cartItems}
//             addItemToCart={this.addItemToCart}
//             removeItemFromCart={this.removeItemFromCart}
//           />
//         ))}
//       </ul>
//     )
//   }

//   renderLoadingView = () => (
//     <div className="loader-container" data-testid="loader">
//       <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
//     </div>
//   )

//   render() {
//     const {isLoading, cartItems} = this.state

//     return isLoading ? (
//       this.renderLoadingView()
//     ) : (
//       <div className="home-container">
//         <Header cartItems={cartItems} />
//         <ul className="tab-container">{this.renderTabMenuList()}</ul>
//         {this.renderDishes()}
//       </div>
//     )
//   }
// }

// export default HomePage
