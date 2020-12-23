interface Type {
  equals(other: Type): boolean;
  toString(): string;
}

class BoolType implements Type {
  equals(other: Type): boolean {
    return other instanceof BoolType;
  }

  toString() {
    return 'boolean';
  }
}

class IntegerType implements Type {
  equals(other: Type): boolean {
    return other instanceof IntegerType;
  }

  toString() {
    return 'number';
  }
}

class VoidType implements Type {
  equals(other: Type): boolean {
    return other instanceof VoidType;
  }

  toString() {
    return 'void';
  }
}

class ArrayType implements Type {
  constructor(public element: Type) {}

  equals(other: Type): boolean {
    return other instanceof ArrayType && this.element.equals(other.element);
  }

  toString() {
    return `Array<${this.element}>`;
  }
}

class FunctionType implements Type {
  constructor(public parameters: Map<string, Type>, public returnType: Type) {}

  equals(other: Type): boolean {
    if (other instanceof FunctionType) {
      // Parameter names are irrelevant, compare only types
      let thisParameterTypes = Array.from(this.parameters.values());
      let otherParameterTypes = Array.from(other.parameters.values());
      return (
        this.parameters.size === other.parameters.size &&
        thisParameterTypes.every((parameter, i) =>
          parameter.equals(otherParameterTypes[i])
        ) &&
        this.returnType.equals(other.returnType)
      );
    } else {
      return false;
    }
  }

  toString() {
    let parameterStrings = Array.from(this.parameters).map(
      ([name, type]) => `${name}: ${type}`
    );
    return `(${parameterStrings.join(', ')}) => ${this.returnType}`;
  }
}

export { Type, BoolType, IntegerType, VoidType, ArrayType, FunctionType };
