```
pnpm install
pnpm run dev
```

```
open http://localhost:3000
```

src/
├── modules/
│   ├── users/          
│   │   ├── user.controller.js
│   │   ├── user.service.js
│   │   ├── user.repository.js
│   │   └── user.schema.ts
│   ├── auth/
│   │   ├── auth.controller.js
│   │   └── jwt.service.js
│   └── products/        
├── shared/              
├── config/
└── server.ts