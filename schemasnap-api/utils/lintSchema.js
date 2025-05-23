const RULES = [
  {
    id: "missing_primary_key",
    message: "Table appears to be missing a PRIMARY KEY.",
    test: (sql) => /create\s+table\s+\w+\s*\((?![^)]*primary key)/i.test(sql)
  },
  {
    id: "missing_foreign_keys",
    message: "Fields ending in '_id' might be missing FOREIGN KEY constraints.",
    test: (sql) => /\b\w+_id\b/i.test(sql) && !/foreign\s+key/i.test(sql)
  },
  {
    id: "float_currency",
    message: "FLOAT used for currency. Consider DECIMAL or NUMERIC.",
    test: (sql) => /\bfloat\b/i.test(sql)
  },
  {
    id: "low_cardinality_index",
    message: "Indexed column like 'status' might be low-cardinality. Indexing may be ineffective.",
    test: (sql) => /create\s+index\s+\w+\s+on\s+\w+\s*\(status\)/i.test(sql)
  },
  {
    id: "missing_check_enum",
    message: "Consider CHECK or ENUM for status/type fields.",
    test: (sql) => /\bstatus\b.*?text/i.test(sql) && !/check\s*\(|enum/i.test(sql)
  },
  {
    id: "inconsistent_naming",
    message: "Mix of camelCase and snake_case found.",
    test: (sql) => /[a-z]+([A-Z][a-z]+)+/.test(sql) && /_/.test(sql)
  },
  {
    id: "nullable_key_fields",
    message: "Key fields like 'user_id' should not be nullable.",
    test: (sql) => /\b\w+_id\b(?![^,]*not null)/i.test(sql)
  }
];

function lintSchema(sql) {
  const results = [];
  for (const rule of RULES) {
    if (rule.test(sql)) {
      results.push({ id: rule.id, message: rule.message });
    }
  }
  return results;
}

// Example usage:
// const fs = require('fs');
// const sql = fs.readFileSync('./example.sql', 'utf8');
// console.log(lintSchema(sql));

module.exports = lintSchema;
