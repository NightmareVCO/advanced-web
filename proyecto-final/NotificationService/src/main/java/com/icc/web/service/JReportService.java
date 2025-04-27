package com.icc.web.service;

import com.icc.web.dto.BookDTO;
import com.icc.web.dto.OrderDTO;
import com.icc.web.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.util.JRLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class JReportService {

    private final ResourceLoader resourceLoader;

    public byte[] generatePurchaseReport(OrderDTO order) {
        try {
            // Load the report template
            Resource resource = resourceLoader.getResource("classpath:Purchase.jrxml");
            JasperReport jasperReport;

            try (InputStream inputStream = resource.getInputStream()) {
                jasperReport = JasperCompileManager.compileReport(inputStream);
            }

            // Prepare parameters for the report
            Map<String, Object> parameters = new HashMap<>();

            // Order information
            parameters.put("orderId", order.getOrderId());
            parameters.put("orderDate", formatDate(order.getOrderDate()));

            // User information
            UserDTO user = order.getUserInfo();
            parameters.put("userEmail", user.getEmail());

            // Prepare book data for the report
            List<Map<String, Object>> bookData = order.getBookInfo().stream()
                    .map(book -> {
                        Map<String, Object> bookMap = new HashMap<>();
                        bookMap.put("title", book.getTitle());
                        bookMap.put("author", book.getAuthor());
                        bookMap.put("price", book.getPrice());
                        bookMap.put("quantity", 1); // Quantity is always 1
                        bookMap.put("totalPrice", book.getPrice()); // Price * Quantity
                        return bookMap;
                    })
                    .collect(Collectors.toList());

            // Create a JRBeanCollectionDataSource from the list
            JRBeanCollectionDataSource bookDataSource = new JRBeanCollectionDataSource(bookData);

            // Pass the books datasource as a parameter
            parameters.put("bookDataSource", bookDataSource);

            // Total Invoice (sum of all book prices)
            double totalInvoice = order.getBookInfo().stream()
                    .mapToDouble(book -> book.getPrice())
                    .sum();
            parameters.put("totalInvoice", String.format("%.2f", totalInvoice));

            // Fill the report
            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, bookDataSource);

            // Export to PDF
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            JasperExportManager.exportReportToPdfStream(jasperPrint, outputStream);

            return outputStream.toByteArray();

        } catch (JRException | IOException e) {
            log.error("Error generating purchase report", e);
            throw new RuntimeException("Failed to generate purchase report", e);
        }
    }

    private String formatDate(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        return dateFormat.format(date);
    }

}