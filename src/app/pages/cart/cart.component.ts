import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit{
  cart: Cart = { items: [
    {
      product: 'https://via.placeholder.com/150',
      name: 'snicke1rs',
      price: 150,
      quantity: 1,
      id: 1
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'shuaifeng',
      price: 170,
      quantity: 3,
      id: 2
    },
  ]}

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ]

  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
      this.dataSource = this.cart.items;
      this.cartService.cart.subscribe((_cart: Cart) => {
        this.cart = _cart;
        this.dataSource = this.cart.items;
      })
  }

  getTotal(items: Array<CartItem>) {
    return this.cartService.getTotal(items);
  }

  onClearCart() {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem) {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem) {
    this.cartService.removeQuantity(item);
  }

  onCheckOut() {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51Nu7EOHtaPxP9ccljRreHQoQK89RrekMEkUYSvmCrYQdxfa2drTQR3au6h2PVKs4nr2VoCLx8rLGjmBZGTvew4e200P1Aw8Zqv');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
