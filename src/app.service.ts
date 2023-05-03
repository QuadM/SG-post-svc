import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  // async create(createPostDto: CreatePostDto): Promise<any> {
  //   return await this.clientKafka
  //     .send('create-post', createPostDto)
  //     .toPromise();
  // }

  // async findAll() {
  //   // return await this.clientKafka.send('get-posts', {}).toPromise();
  //   console.log('called find all');
  //   return { posts: ['post'] };
  // }

  async findAll(): Promise<Post[]> {
    return this.postModel.find();
  }
  async createPost(post: CreatePostDto): Promise<Post> {
    const newPost = new this.postModel(post);
    return newPost.save();
  }

  async getPostById(postId: string): Promise<Post> {
    return this.postModel.findById(postId);
  }

  async updatePost(postId: string, updates: Partial<Post>): Promise<Post> {
    return this.postModel.findByIdAndUpdate(postId, updates);
  }

  async deletePost(postId: string): Promise<void> {
    await this.postModel.findByIdAndDelete(postId);
  }
}
