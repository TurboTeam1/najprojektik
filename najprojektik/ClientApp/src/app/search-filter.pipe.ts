import { Pipe, PipeTransform } from '@angular/core';
import { GuildDto } from './guild/guild.component';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: GuildDto[], searchTerm: string): GuildDto[] {
    if (!searchTerm) {
      return items;
    }
    const filteredItems: GuildDto[] = [];

    for (const item of items) {
      const matches = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      if (matches) {
        filteredItems.push(item);
      }
    }
    return filteredItems;
  }

}
