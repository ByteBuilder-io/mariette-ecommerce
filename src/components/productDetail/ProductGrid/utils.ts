export const images = [
    {
      id: '01',
      src: 'https://images.unsplash.com/photo-1602024242516-fbc9d4fda4b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      alt: 'Awesome watch',
    },
    {
      id: '02',
      src: 'https://images.unsplash.com/photo-1451290337906-ac938fc89bce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1777&q=80',
      alt: 'Awesome watch',
    },
    {
      id: '03',
      src: 'https://images.unsplash.com/photo-1568010434570-74e9ba7126bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      alt: 'Awesome watch',
    },
    {
      id: '04',
      src: 'https://images.unsplash.com/photo-1569411032431-07598b0012c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
      alt: 'Awesome watch',
    },
    {
      id: '05',
      src: 'https://images.unsplash.com/photo-1565440962783-f87efdea99fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=936&q=80',
      alt: 'Awesome watch',
    },
    {
      id: '06',
      src: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1420&q=80',
      alt: 'Awesome watch',
    },
  ]
  
  export const products = [
    {
      id: '1',
      name: 'Bamboo Tan',
      currency: 'USD',
      price: 199,
      flag: 'new',
      imageUrl:
        'https://mariette.com.mx/wp-content/uploads/2023/03/DIANA-2-scaled.jpg',
      hoverImg: "https://mariette.com.mx/wp-content/uploads/2023/03/DIANA-5-scaled.jpg",
      rating: 4,
      ratingCount: 1,
      description:
        'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
      images,
    },
    {
      id: '2',
      name: 'Iconic Turquoise',
      currency: 'USD',
      price: 199,
      salePrice: 179.99,
      flag: 'on-sale',
      imageUrl:
        'https://mariette.com.mx/wp-content/uploads/2022/10/LUCIA-4-scaled.jpg',
      hoverImg: "https://mariette.com.mx/wp-content/uploads/2022/10/LUCIA-9-scaled.jpg",
      rating: 4,
      ratingCount: 12,
      description:
        'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
      images,
    },
    {
      id: '3',
      name: 'Marble Leather',
      currency: 'USD',
      price: 199,
      imageUrl:
        'https://mariette.com.mx/wp-content/uploads/2022/10/MIRIAM-1-scaled.jpg',
      hoverImg: "https://mariette.com.mx/wp-content/uploads/2022/10/MIRIAM-4-scaled.jpg",
      rating: 4,
      ratingCount: 12,
      description:
        'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
      images,
    },
    {
      id: '4',
      name: "Churumbela 'Fabiola'",
      currency: 'GBP',
      price: 199,
      imageUrl:
        'https://mariette.com.mx/wp-content/uploads/2022/10/FABIOLA-1-scaled.jpg',
      hoverImg: "https://mariette.com.mx/wp-content/uploads/2022/10/FABIOLA-5-scaled.jpg",
      rating: 5,
      ratingCount: 1,
      description:
        'With a sleek design and a captivating essence, this is a modern Classic made for every occasion.',
      images,
    },
  ]
  
  export type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
    infer ElementType
  >
    ? ElementType
    : never
  
  export type Product = ElementType<typeof products>
  export type ProductImage = ElementType<typeof images>