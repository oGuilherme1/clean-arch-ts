import { describe, expect, it } from 'vitest';
import { CreateArticleInput, CreateArticleUseCase } from '../../src/application/usecases/article/create-article.usecase';
import { MockArticleGateway } from '../../src/application/usecases/article/mock-article.gateway';

describe('CreateArticleUseCase', () => {
  it('should create a new article successfully', async () => {
    // Mock data for the input
    const input1: CreateArticleInput = {
      projectId: 'project_id',
      title: 'Test Article',
      content: 'This is a test article content.',
      author: 'John Doe',
    };
    const input2: CreateArticleInput = {
        projectId: 'project_id',
        title: 'Test Article 2',
        content: 'This is a test article content.',
        author: 'John Doe 2',
    };

    const articleGateway = new MockArticleGateway();

    // Create an instance of the use case
    const createArticleUseCase = CreateArticleUseCase.create(articleGateway);

    // Execute the use case
    const article1 = await createArticleUseCase.execute(input1);
    const article2 = await createArticleUseCase.execute(input2);

    

    // Verify if the output of the use case is correct
    expect(article1.article.projectId).toBeDefined();
    expect(article1.article.title).toBe(input1.title);
    expect(article1.article.content).toBe(input1.content);
    expect(article1.article.author).toBe(input1.author);

    expect(article2.article.projectId).toBeDefined();
    expect(article2.article.title).toBe(input2.title);
    expect(article2.article.content).toBe(input2.content);
    expect(article2.article.author).toBe(input2.author);

    const articleData = await articleGateway.index('project_id');

    console.log('Articles:', articleData);
  });
});
