# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

pos-system/
├── public/
├── src/
│ ├── app/
│ │ ├── App.tsx
│ │ ├── App.css
│ │ └── router.tsx
│ │
│ ├── core/
│ │ ├── entities/
│ │ │ ├── Product.ts
│ │ │ ├── CartItem.ts
│ │ │ └── Order.ts
│ │ │
│ │ ├── repositories/
│ │ │ ├── IProductRepository.ts
│ │ │ └── IOrderRepository.ts
│ │ │
│ │ └── usecases/
│ │ ├── cart/
│ │ │ ├── AddToCartUseCase.ts
│ │ │ ├── RemoveFromCartUseCase.ts
│ │ │ ├── ClearCartUseCase.ts
│ │ │ └── CalculateTotalUseCase.ts
│ │ │
│ │ └── order/
│ │ ├── CreateOrderUseCase.ts
│ │ └── SubscribeToOrdersUseCase.ts
│ │
│ ├── infrastructure/
│ │ ├── api/
│ │ │ ├── axiosConfig.ts
│ │ │ ├── ProductApiRepository.ts
│ │ │ └── OrderApiRepository.ts
│ │ │
│ │ ├── websocket/
│ │ │ └── OrderWebSocket.ts
│ │ │
│ │ └── dto/
│ │ ├── ProductDTO.ts
│ │ └── OrderDTO.ts
│ │
│ ├── presentation/
│ │ ├── pages/
│ │ │ ├── POSScreen/
│ │ │ │ ├── POSScreen.tsx
│ │ │ │ └── usePOS.ts
│ │ │ │
│ │ │ └── RealtimeScreen/
│ │ │ ├── RealtimeScreen.tsx
│ │ │ └── useRealtime.ts
│ │ │
│ │ ├── components/
│ │ │ ├── pos/
│ │ │ │ ├── ProductList.tsx
│ │ │ │ ├── ProductCard.tsx
│ │ │ │ ├── Cart.tsx
│ │ │ │ ├── CartItem.tsx
│ │ │ │ └── CheckoutButton.tsx
│ │ │ │
│ │ │ ├── realtime/
│ │ │ │ ├── OrderList.tsx
│ │ │ │ └── OrderCard.tsx
│ │ │ │
│ │ │ └── shared/
│ │ │ ├── Button.tsx
│ │ │ ├── Card.tsx
│ │ │ └── Loading.tsx
│ │ │
│ │ ├── hooks/
│ │ │ ├── useCart.ts
│ │ │ ├── useProducts.ts
│ │ │ └── useOrders.ts
│ │ │
│ │ └── types/
│ │ └── component.types.ts
│ │
│ ├── shared/
│ │ ├── constants/
│ │ │ └── config.ts
│ │ │
│ │ ├── types/
│ │ │ ├── common.types.ts
│ │ │ └── api.types.ts
│ │ │
│ │ └── utils/
│ │ ├── formatCurrency.ts
│ │ └── formatDate.ts
│ │
│ ├── main.tsx
│ ├── index.css
│ └── vite-env.d.ts
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md

Giải thích cấu trúc:

1. core/ - Business Logic (Domain Layer)

entities/: Định nghĩa các model/class thuần túy (Product, CartItem, Order)
usecases/: Business logic, các case sử dụng chính của app (addToCart, createOrder, etc.)

2. infrastructure/ - Tầng kết nối bên ngoài

api/: HTTP requests (Axios)
websocket/: WebSocket/SSE cho realtime updates

3. presentation/ - UI Layer

pages/: Các màn hình chính + custom hooks của page đó
components/: Components được chia theo feature (pos, realtime) và shared
hooks/: Custom hooks dùng chung

4. shared/ - Utilities & Constants

Constants, helper functions, formatters

Ưu điểm của cấu trúc này:
✅ Phân tách rõ ràng: Business logic tách khỏi UI
✅ Dễ test: Core logic không phụ thuộc framework
✅ Dễ mở rộng: Thêm feature mới không ảnh hưởng code cũ
✅ Không over-engineering: Đủ clean cho bài toán này
✅ Team-friendly: Dễ phân chia công việc
