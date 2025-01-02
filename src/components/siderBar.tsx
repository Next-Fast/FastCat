import { Listbox, ListboxItem } from '@nextui-org/listbox'
import { DefaultMenuItems } from '@/lib/MenuItem';
import { Link } from '@nextui-org/link';

function Sidebar() {
  return (
    <Listbox>
      {
        DefaultMenuItems.map(item => 
        (  
          <ListboxItem as={Link} href={item.url} startContent={item.icon && <item.icon />}>
            {item.name}
          </ListboxItem>)
        )
      }
    </Listbox>
  )
}

export default Sidebar;