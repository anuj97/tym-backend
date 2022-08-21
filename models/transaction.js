class Transaction {
    name = "name";
    description;
    date;
    time;
    amount;
    transactionType;
    category;
    tags;

    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    setDate(date) {
        this.date = date;
    }

    setTime(time) {
        this.time = time;
    }

    setAmount(amount) {
        this.amount = amount;
    }

    setCategory(category) {
        this.category = category;
    }
}

module.exports = Transaction;