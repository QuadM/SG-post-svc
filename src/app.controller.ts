import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.schema';

@Controller()
export class AppController {
  constructor(private readonly postService: AppService) {}

  @MessagePattern('get-all-posts')
  async getPosts(): Promise<any> {
    return await this.postService.findAll();
  }

  @MessagePattern('get-post-by-id')
  async getPostById(@Payload('postId') postId: string) {
    return this.postService.getPostById(postId);
  }

  @MessagePattern('create-post')
  async handlePostCreate(@Payload() createPostDto: CreatePostDto) {
    this.postService.createPost(createPostDto);
  }

  @MessagePattern('update-post')
  async handlePostUpdate(
    @Payload('postId') postId: string,
    @Payload('updates') updates: Partial<Post>,
  ) {
    return this.postService.updatePost(postId, updates);
  }

  @MessagePattern('delete-post')
  async handlePostDelete(@Payload('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
