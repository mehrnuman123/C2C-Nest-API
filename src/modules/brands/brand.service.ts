import { Injectable } from "@nestjs/common";
import { Brand } from "./brand.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class BrandService {
    @InjectRepository(Brand)
    private readonly repository: Repository<Brand>;

    async saveBrandData(location, data) {
        const brand = new Brand();
        brand.title = data?.name;
        brand.pictureUrl = location
        brand.createdAt = new Date();
        brand.updatedAt = new Date();
        return this.repository.save(brand)
    }

    async getAll(): Promise<Brand[] | undefined> {
    return await this.repository.find()
    }

}