import { Cart, CartItem, intcart } from '@/type/cart'
import api from '@/utils/api'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: intcart = {
  cart: null,
  isloading: false,
  error: ''
}

// Fetch Cart
export const fetchCart = createAsyncThunk<Cart, void>(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Cart[]>('carts/')
      if (response.data.length === 0) throw new Error('Cart is empty')
      return response.data[0]
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)

// Add to cart
export const addToCart = createAsyncThunk<
  { response: CartItem; product_id: number },
  number,
  { rejectValue: string }
>('cart/addToCart', async (product_id, { rejectWithValue }) => {
  try {
    const response = await api.post<CartItem>(`cart-items/add_to_cart/`, {
      product_id: product_id
    })
    return { response: response.data, product_id }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('Unknown error')
  }
})

// Update cart
export const updatecart = createAsyncThunk<
  { response: CartItem; item: { id: number; quantity: number } },
  { id: number; quantity: number },
  { rejectValue: string }
>('cart/updateCart', async (item, { rejectWithValue }) => {
  try {
    if (item.quantity < 0) {
      return rejectWithValue('quantity must be a positive value')
    }
    const response = await api.patch<CartItem>(`cart-items/${item.id}/`, {
      quantity: item.quantity
    })
    return { response: response.data, item }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('Unknown error')
  }
})
// togle is cheaked
export const toogleischeaked = createAsyncThunk<
  { response: CartItem; id: number; ischeaked: boolean },
  { id: number; ischeaked: boolean },
  { rejectValue: string }
>('cart/toogleischeaked', async ({ id, ischeaked }, { rejectWithValue }) => {
  try {
    const response = await api.patch<CartItem>(`cart-items/${id}/`, {
      ischeaked: ischeaked
    })
    return { id, ischeaked, response: response.data }
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message)
    }
    return rejectWithValue('Unknown error')
  }
})

// Remove from cart
export const removeFromCart = createAsyncThunk<number, number, { rejectValue: string }>(
  'cart/removeFromCart',
  async (product_id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`cart-items/${product_id}/`)
      if (response.status !== 200) throw new Error('Failed to remove item')
      return product_id
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue('Unknown error')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateQuantityLocally: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload
      const item = state.cart?.items.find((i) => i.id === id)
      const itemprice = item?.product_detail.price
        ? parseFloat(item?.product_detail.price || '0')
        : 0

      if (item && state.cart && quantity > 0 && item.ischeaked) {
        // পুরোনো quantity বাদ দিয়ে নতুন quantity যোগ করো
        const oldSubtotal = item.quantity * itemprice
        const newSubtotal = quantity * itemprice

        state.cart.total_quantity = state.cart.total_quantity - item.quantity + quantity
        state.cart.total_price = parseFloat(
          (state.cart.total_price - oldSubtotal + newSubtotal).toFixed(2)
        )

        item.quantity = quantity
      } else if (item && state.cart && quantity > 0 && !item.ischeaked) {
        state.cart.total_quantity = state.cart.total_quantity - item.quantity + quantity
        item.quantity = quantity
      }
    },
    removeLocally: (state, action: PayloadAction<number>) => {
      const item = state.cart?.items.find((itm) => itm.id == action.payload)
      const itemprice = item?.product_detail.price
        ? parseFloat(item?.product_detail.price || '0')
        : 0
      if (state.cart && item) {
        state.cart.total_quantity -= item.quantity
        state.cart.total_price -= parseFloat((item.quantity * itemprice).toFixed(2))
        state.cart.items = state.cart.items.filter((itm) => itm.id !== action.payload)
      }
    },
    toggleischeakedlocally: (state, action: PayloadAction<{ id: number; ischeaked: boolean }>) => {
      const item = state.cart?.items.find((itm) => itm.id == action.payload.id)
      const itemprice = item?.product_detail.price
        ? parseFloat(item?.product_detail.price || '0')
        : 0
      if (item && state.cart) {
        if (action.payload.ischeaked) {
          state.cart.total_price += parseFloat((item.quantity * itemprice).toFixed(2))
        } else {
          state.cart.total_price -= parseFloat((item.quantity * itemprice).toFixed(2))
        }
        item.ischeaked = action.payload.ischeaked
      }
    },
    addtocartlocally: (state, action: PayloadAction<number>) => {
      const item = state.cart?.items.find((i) => i.id == action.payload)
      const itemprice = item?.product_detail.price
        ? parseFloat(item?.product_detail.price || '0')
        : 0
      if (item && state.cart) {
        state.cart.total_price += parseFloat(itemprice.toFixed(2))
        state.cart.total_quantity += 1
      }
    },
    // clear cart on logout
    clearCart: (state) => {
      state.cart = null
      state.isloading = false
      state.error = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.isloading = true
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.isloading = false
        state.cart = action.payload
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isloading = false
        state.error = action.payload as string
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const { response, product_id } = action.payload
        const finditem = state.cart?.items.find((itm) => itm.id === product_id)
        if (finditem) {
          finditem.quantity = response.quantity
        } else {
          state.cart?.items?.push(response)
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (state.cart)
          state.cart.items = state.cart.items.filter((itm) => itm.id !== action.payload)
      })
      .addCase(updatecart.fulfilled, (state, action) => {
        const { item, response } = action.payload
        const finditem = state.cart?.items.find((itm) => itm.id === item.id)
        if (finditem) finditem.quantity = response.quantity
      })
      .addCase(toogleischeaked.fulfilled, (state, action) => {
        const item = state.cart?.items.find((itm) => itm.id == action.payload.id)
        if (item) item.ischeaked = action.payload.ischeaked
      })
  }
})

export const { updateQuantityLocally, removeLocally, toggleischeakedlocally,clearCart } = cartSlice.actions
export default cartSlice.reducer
