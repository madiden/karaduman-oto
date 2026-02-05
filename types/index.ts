export type Car = {
    id: string;
    created_at: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    km: number;
    fuel_type: string;
    gear_type: string;
    engine_power: string;
    description: string;
    is_showcase: boolean;
    images: string[];
    listing_date: string;
};

export type Comment = {
    id: string;
    created_at: string;
    user_name: string;
    user_image?: string;
    message: string;
    is_approved: boolean;
};

export type Database = {
    public: {
        Tables: {
            cars: {
                Row: Car;
                Insert: Omit<Car, 'id' | 'created_at'>;
                Update: Partial<Omit<Car, 'id' | 'created_at'>>;
            };
            comments: {
                Row: Comment;
                Insert: Omit<Comment, 'id' | 'created_at' | 'is_approved'>;
                Update: Partial<Omit<Comment, 'id' | 'created_at'>>;
            };
        };
    };
};
