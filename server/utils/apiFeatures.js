class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // Filter , sorting and pagination
  filter() {
    const queryObj = { ...this.queryStr } // this.queryStr = req.query
    //console.log(queryObj) //Before delete page

    const excludedFields = ['page', 'sort', 'limit']
    excludedFields.forEach(el => delete (queryObj[el]));
   // console.log(queryObj) //after delete page
    
    let queryStr = JSON.stringify(queryObj)
    // console.log({ queryObj, queryStr })

    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
    // console.log({  queryStr })
    
     //   gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than

    this.query.find(JSON.parse(queryStr))
    // console.log({  queryStr })

    return this;

  }

  sort() {

    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ')
      // console.log(sortBy)
      this.query = this.query.sort(sortBy);

    }
    else {
      this.query = this.query.sort('-createdAt')
    }
    return this;
   }
  pagination() {
    const page = this.queryStr.page * 1 || 1;
    // console.log(page);
    const limit = this.queryStr.limit * 1 || 5;
    // console.log(limit)

    const skip = (page - 1) * limit;
    // console.log(skip);
    this.query = this.query.skip(skip).limit(limit);
    return this;

  }
}

module.exports =  APIFeatures;