/* eslint-disable */
export default {
  '@nestjs/swagger': {
    models: [
      [
        import('./dto/books.dto'),
        {
          GetBooksDTO: {
            skip: { required: true, type: () => String },
            take: { required: true, type: () => String },
          },
          GetBooksByTagNameDTO: {
            name: { required: true, type: () => String },
          },
          GetBooksByPointDTO: {
            min: { required: true, type: () => String },
            max: { required: true, type: () => String },
          },
          GetBooksByTitleDTO: { name: { required: true, type: () => String } },
        },
      ],
      [
        import('./dto/user.dto'),
        {
          CreateUserDTO: {
            username: { required: true, type: () => String },
            password: { required: true, type: () => String },
          },
          LoginUserDTO: {
            username: { required: true, type: () => String },
            password: { required: true, type: () => String },
          },
        },
      ],
      [
        import('./dto/cart.dto'),
        {
          AddBookToCartDTO: {
            bookId: { required: true, type: () => String },
            userId: { required: true, type: () => String },
          },
        },
      ],
      [
        import('./dto/order.dto'),
        {
          CreateOrderDTO: { userId: { required: true, type: () => String } },
          CancelOrderDTO: { userId: { required: true, type: () => String } },
          PayOrderDTO: { userId: { required: true, type: () => String } },
        },
      ],
    ],
    controllers: [
      [
        import('./controllers/book.controller'),
        {
          BookController: {
            getBooks: {},
            getBooksByAuthorId: {},
            getBooksByTagName: {},
            getBooksByPoint: {},
            getBooksByTitle: {},
          },
        },
      ],
      [
        import('./controllers/user.controller'),
        {
          UserController: {
            createUser: {},
            loginUser: {},
            getUserPoint: { type: Object },
          },
        },
      ],
      [
        import('./controllers/cart.controller'),
        {
          CartController: {
            getCartByUserId: {},
            addBookToCart: {},
            removeBookFromCart: {},
          },
        },
      ],
      [
        import('./controllers/order.controller'),
        {
          OrderController: {
            getOrderByUserId: {},
            createOrder: {},
            cancelOrder: {},
            payOrder: {},
          },
        },
      ],
    ],
  },
};
