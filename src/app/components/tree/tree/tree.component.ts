import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';

export interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Proyecto A',
    children: [
      {
        name: 'Módulo 1',
        children: [{ name: 'Componente 1-1' }, { name: 'Componente 1-2' }],
      },
      { name: 'Módulo 2' },
    ],
  },
  {
    name: 'Proyecto B',
    children: [
      {
        name: 'Sección 1',
        children: [
          {
            name: 'Elemento 1-1',
            children: [{ name: 'Subelemento 1-1-1' }, { name: 'Subelemento 1-1-2' }],
          },
          { name: 'Elemento 1-2' },
        ],
      },
      {
        name: 'Sección 2',
        children: [{ name: 'Elemento 2-1' }, { name: 'Elemento 2-2' }],
      },
    ],
  },
  {
    name: 'Proyecto C',
    children: [{ name: 'Documento 1' }, { name: 'Documento 2' }],
  },
];

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [MatTreeModule, MatIconModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css',
})
export class TreeComponent {
  treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  filterText = '';

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  applyFilter() {
    if (this.filterText) {
      this.dataSource.data = this.filterTree(TREE_DATA, this.filterText.toLowerCase());
    } else {
      this.dataSource.data = TREE_DATA;
    }
  }

  filterTree(nodes: TreeNode[], filter: string): TreeNode[] {
    return nodes
      .map((node) => {
        const children = node.children ? this.filterTree(node.children, filter) : [];
        if (node.name.toLowerCase().includes(filter) || children.length) {
          return { ...node, children };
        }
        return null;
      })
      .filter((node) => node !== null) as TreeNode[];
  }
}
