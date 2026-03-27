"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Heart, ShoppingCart, Search, Filter, Grid, List } from "lucide-react";
import { ProductCardSkeleton } from "@/components/ui/loading-states";

const products = [
  {
    id: 1,
    name: "Modern Jute Rug",
    category: "Decor",
    price: 4999,
    originalPrice: 6999,
    vendor: "The Rug Republic",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "jute rug",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    tags: ["eco-friendly", "handmade", "natural"]
  },
  {
    id: 2,
    name: "Minimalist Sofa",
    category: "Furniture",
    price: 35000,
    originalPrice: 45000,
    vendor: "Urban Ladder",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "minimalist sofa",
    rating: 4.8,
    reviews: 256,
    inStock: true,
    tags: ["modern", "comfortable", "versatile"]
  },
  {
    id: 3,
    name: "Terracotta Wall Paint",
    category: "Paints",
    price: 2500,
    originalPrice: 3200,
    vendor: "Asian Paints",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "paint can",
    rating: 4.3,
    reviews: 89,
    inStock: true,
    tags: ["natural", "warm", "durable"]
  },
  {
    id: 4,
    name: "Bohemian Throw Pillow",
    category: "Decor",
    price: 1200,
    originalPrice: 1500,
    vendor: "Fabindia",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "throw pillow",
    rating: 4.6,
    reviews: 167,
    inStock: false,
    tags: ["bohemian", "colorful", "soft"]
  },
  {
    id: 5,
    name: "Wooden Coffee Table",
    category: "Furniture",
    price: 8500,
    originalPrice: 12000,
    vendor: "Pepperfry",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "coffee table",
    rating: 4.7,
    reviews: 203,
    inStock: true,
    tags: ["wooden", "rustic", "sturdy"]
  },
  {
    id: 6,
    name: "Ceramic Floor Tiles",
    category: "Tiles",
    price: 150,
    originalPrice: 200,
    vendor: "Kajaria",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "floor tiles",
    rating: 4.4,
    reviews: 145,
    inStock: true,
    tags: ["ceramic", "durable", "easy-clean"]
  },
  {
    id: 7,
    name: "Pendant Lamp",
    category: "Decor",
    price: 3200,
    originalPrice: 4000,
    vendor: "IKEA",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "pendant lamp",
    rating: 4.2,
    reviews: 78,
    inStock: true,
    tags: ["modern", "elegant", "energy-efficient"]
  },
  {
    id: 8,
    name: "Sheesham Wood Bookshelf",
    category: "Furniture",
    price: 12999,
    originalPrice: 15999,
    vendor: "Wakefit",
    image: "https://placehold.co/400x400.png",
    dataAiHint: "wood bookshelf",
    rating: 4.9,
    reviews: 312,
    inStock: true,
    tags: ["sheesham", "storage", "classic"]
  },
];

const categories = ["All", "Furniture", "Decor", "Paints", "Tiles"];
const vendors = ["All", "Urban Ladder", "Asian Paints", "Pepperfry", "Fabindia", "IKEA", "Wakefit", "The Rug Republic", "Kajaria"];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedVendor, setSelectedVendor] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesVendor = selectedVendor === "All" || product.vendor === selectedVendor;
      
      let matchesPrice = true;
      if (priceRange === "low") matchesPrice = product.price <= 5000;
      else if (priceRange === "medium") matchesPrice = product.price > 5000 && product.price <= 20000;
      else if (priceRange === "high") matchesPrice = product.price > 20000;

      return matchesSearch && matchesCategory && matchesVendor && matchesPrice;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "reviews":
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, selectedVendor, priceRange, sortBy]);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDiscountPercentage = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="font-headline text-4xl font-bold">Shop Your Design</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover curated products that match your AI-generated design. Quality furniture, decor, and materials from trusted brands.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products, brands, or styles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Brand</Label>
              <Select value={selectedVendor} onValueChange={setSelectedVendor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor} value={vendor}>
                      {vendor}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Price Range</Label>
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="low">Under ₹5,000</SelectItem>
                  <SelectItem value="medium">₹5,000 - ₹20,000</SelectItem>
                  <SelectItem value="high">Above ₹20,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} products found
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSelectedVendor("All");
              setPriceRange("all");
              setSortBy("featured");
            }}
          >
            Clear Filters
          </Button>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
                setSelectedVendor("All");
                setPriceRange("all");
                setSortBy("featured");
              }}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={product.dataAiHint}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <Badge className="absolute top-2 right-2">{product.category}</Badge>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">Out of Stock</Badge>
                      </div>
                    )}
                    {product.originalPrice > product.price && (
                      <Badge variant="destructive" className="absolute top-2 left-2">
                        {getDiscountPercentage(product.originalPrice, product.price)}% OFF
                      </Badge>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.vendor}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-lg text-primary">
                        {formatPrice(product.price)}
                      </p>
                      {product.originalPrice > product.price && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart className={`h-4 w-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    <span className="sr-only">Add to Wishlist</span>
                  </Button>
                  <Button className="w-full" disabled={!product.inStock}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
