class ApiFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	search() {
		const keyword = this.queryStr.keyword
			? {
					name: {
						$regex: this.queryStr.keyword,
						$options: "i",
					},
			  }
			: {};

		this.query = this.query.find(keyword);
		return this;
	}

	filter() {
		let queryCopy = { ...this.queryStr };
		const removedParams = ["keyword", "page", "limit"];

		removedParams.forEach((element) => {
			delete queryCopy[element];
		});

		// for price range queries
		let querystr = JSON.stringify(queryCopy);
		querystr = querystr.replace(/\b(gt|gte|lte|lt)\b/g, (key) => {
			return `$${key}`;
		});

		queryCopy = JSON.parse(querystr);

		this.query = this.query.find(queryCopy);
		return this;
	}

	pagination(resultsPerPage) {
		const currentPage = Number(this.queryStr.page) || 1;
		const skip = resultsPerPage * (currentPage - 1);

		this.query = this.query.limit(resultsPerPage).skip(skip);
		return this;
	}
}

module.exports = ApiFeatures;
