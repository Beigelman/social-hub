import { Page } from '../../domain/Page';
import { PageRepository } from '../../domain/PageRepository';

const makeMockedPageRepository = (): PageRepository => {
  const pages: Page.Type[] = [];
  return {
    async findById(id) {
      const pageFound = pages.find(page => page.id.value === id);
      return pageFound;
    },
    async getNextId() {
      return {
        value: 'mockedId',
      };
    },
    async store(data) {
      const pageIndex = pages.findIndex(page => page.id === data.id);

      if (pageIndex > -1) {
        pages[pageIndex] = data;
        return;
      }

      pages.push(data);
    },
  };
};

export { makeMockedPageRepository };
