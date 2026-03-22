package com.abrahamquintana.personalfinancemanager.controller;

import com.abrahamquintana.personalfinancemanager.model.Category;
import com.abrahamquintana.personalfinancemanager.model.Transaction;
import com.abrahamquintana.personalfinancemanager.model.TransactionType;
import com.abrahamquintana.personalfinancemanager.model.User;
import com.abrahamquintana.personalfinancemanager.repository.CategoryRepository;
import com.abrahamquintana.personalfinancemanager.repository.TransactionRepository;
import com.abrahamquintana.personalfinancemanager.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;

@RestController("/test")
public class TestsControler {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final TransactionRepository transactionRepository;

    public TestsControler(UserRepository userRepository, CategoryRepository categoryRepository, TransactionRepository transactionRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.transactionRepository = transactionRepository;
    }

    @GetMapping("/hola")
    public String holaMundo(){
        return "Hola mundo !!";
    }

    @GetMapping("/test-user")
    public String createUser() {
        User u = User.builder()
                .email("test@example.com")
                .password("1234")
                .build();

        userRepository.save(u);
        return "Usuario creado: " + u.getId();
    }

    @GetMapping("/test-category")
    public String createCategory() {
        Category c = Category.builder()
                .name("Alimentación")
                .build();

        categoryRepository.save(c);
        return "Categoría creada: " + c.getId();
    }

    @GetMapping("/test-transaction")
    public String createTransaction() {

        User user = userRepository.findById(1L).orElseThrow();
        Category category = categoryRepository.findById(1L).orElseThrow();

        Transaction t = Transaction.builder()
                .amount(new BigDecimal("25.50"))
                .date(LocalDate.now())
                .description("Cena en restaurante")
                .type(TransactionType.EXPENSE)
                .user(user)
                .category(category)
                .build();

        transactionRepository.save(t);

        return "Transacción creada: " + t.getId();
    }


}
