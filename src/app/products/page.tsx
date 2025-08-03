import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";

const products = [
  {
    name: "Modern Jute Rug",
    category: "Decor",
    price: "₹4,999",
    vendor: "The Rug Republic",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "jute rug",
  },
  {
    name: "Minimalist Sofa",
    category: "Furniture",
    price: "₹35,000",
    vendor: "Urban Ladder",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "minimalist sofa",
  },
  {
    name: "Terracotta Wall Paint",
    category: "Paints",
    price: "₹2,500",
    vendor: "Asian Paints",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "paint can",
  },
  {
    name: "Bohemian Throw Pillow",
    category: "Decor",
    price: "₹1,200",
    vendor: "Fabindia",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "throw pillow",
  },
  {
    name: "Wooden Coffee Table",
    category: "Furniture",
    price: "₹8,500",
    vendor: "Pepperfry",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "coffee table",
  },
  {
    name: "Ceramic Floor Tiles",
    category: "Tiles",
    price: "₹150/sq.ft",
    vendor: "Kajaria",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "floor tiles",
  },
  {
    name: "Pendant Lamp",
    category: "Decor",
    price: "₹3,200",
    vendor: "IKEA",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "pendant lamp",
  },
  {
    name: "Sheesham Wood Bookshelf",
    category: "Furniture",
    price: "₹12,999",
    vendor: "Wakefit",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "wood bookshelf",
  },
];

export default function ProductsPage() {
  const filters = ["All", "Furniture", "Paints", "Decor", "Tiles"];

  return (
    <div className="container mx-auto py-12">
      <div className="space-y-4 text-center mb-12">
        <h1 className="font-headline text-4xl font-bold">Product Catalog</h1>
        <p className="text-lg text-muted-foreground">
          Discover curated products to bring your design to life.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {filters.map((filter) => (
          <Button key={filter} variant={filter === 'All' ? 'default' : 'secondary'}>
            {filter}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.name} className="overflow-hidden group">
            <CardContent className="p-0">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={product.dataAiHint}
                />
                <Badge className="absolute top-2 right-2">{product.category}</Badge>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.vendor}</p>
                <p className="font-bold text-lg text-primary">{product.price}</p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Heart className="h-4 w-4" />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
